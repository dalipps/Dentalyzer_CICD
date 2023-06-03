import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseService, downloadPdf, getPdfTemplatePath } from '@dentalyzer/common'
import { TranslateService } from '@ngx-translate/core'
import { NoSuchFieldError, PDFDocument, PDFTextField } from 'pdf-lib'
import { Observable, filter, first, from, map, of, switchMap, takeUntil, tap } from 'rxjs'
import { AccountService } from 'src/app/login/account/account.service'
import { FrsCalculation } from '../calculation'
import { FrsCalculationUnitMapping } from '../calculations-list/frs-calculation-unit.pipe'
import { FrsAnalysis, FrsFacade } from '../store'
import { FrsPdfMappingData } from './frs-pdf-data.model'
import { frsPdfMapping } from './frs-pdf-mapping.config'
import { getInterpretationKey } from './frs-pdf.utils'

export const FRS_TEMPLATE_FILE_NAME = 'FRS-Template'

@Injectable({
	providedIn: 'root',
})
export class FrsPdfService extends BaseService {
	private analysis: FrsAnalysis | undefined

	constructor(
		private translateService: TranslateService,
		private accountService: AccountService,
		private snackBar: MatSnackBar,
		frsFacade: FrsFacade
	) {
		super()

		frsFacade.active$
			.pipe(
				takeUntil(this.destroy$),
				tap((analysis) => (this.analysis = analysis))
			)
			.subscribe()
	}

	generatePdf() {
		if (!this.analysis) return
		const pdfEntries = this.getCalculationEntries(this.analysis.calculations)

		this.getFile$()
			.pipe(
				filter((file): file is ArrayBuffer => !!file),
				switchMap((file) => this.writeFields(pdfEntries, file)),
				first(),
				tap((pdf) => downloadPdf(pdf, this.getFileName()))
			)
			.subscribe()
	}

	private writeFields(pdfEntries: FrsPdfMappingData[], buffer: ArrayBuffer): Observable<Blob> {
		return of(buffer).pipe(
			switchMap((buffer) => from(PDFDocument.load(buffer))),
			map((pdf) => {
				const form = pdf.getForm()
				let someFieldsNotFound = false

				pdfEntries.forEach((entry) => {
					const { fieldName } = entry

					try {
						const field = form.getField(fieldName)
						if (field instanceof PDFTextField) {
							field.setText(entry.text)
						} else throw new NoSuchFieldError('Field not found')
					} catch (error: unknown) {
						if (error instanceof NoSuchFieldError) {
							someFieldsNotFound = true
							console.error(`Field with key ${fieldName} could not be found`)
						}
					}
				})

				if (someFieldsNotFound) {
					this.snackBar.open(this.translateService.instant(t('PDF.SomeFieldsNotFound')))
				}

				return pdf
			}),
			switchMap((pdf) => from(pdf.save({ updateFieldAppearances: true }))),
			map((bytes) => new Blob([bytes]))
		)
	}

	private getCalculationEntries(calculations: FrsCalculation[]): FrsPdfMappingData[] {
		const pdfEntries: FrsPdfMappingData[] = this.getDefaultPdfEntries()

		calculations.forEach((calculation) => {
			const mapping = frsPdfMapping.get(calculation.id)
			if (!mapping) return

			const { valueFieldNames, interpretationFieldName, showTargetAsValue } = mapping

			if (calculation.value) {
				const value =
					showTargetAsValue && calculation.targetValueMaleOrAll !== undefined
						? calculation.targetValueMaleOrAll
						: calculation.value

				valueFieldNames.forEach((fieldName) => {
					pdfEntries.push({
						fieldName,
						text: `${value} ${FrsCalculationUnitMapping[calculation.unit]}`,
					})
				})

				const interpretationKey = getInterpretationKey(calculation)

				if (interpretationKey) {
					pdfEntries.push({
						fieldName: interpretationFieldName,
						text: this.translateService.instant(interpretationKey),
					})
				}
			}
		})

		return pdfEntries
	}

	private getFile$(): Observable<ArrayBuffer | undefined> {
		const filePath = getPdfTemplatePath(FRS_TEMPLATE_FILE_NAME)
		return from(fetch(filePath)).pipe(switchMap((pdf) => from(pdf.arrayBuffer())))
	}

	private getFileName(): string {
		const date = this.getLocaleFormattedDate()
		const analysis = this.translateService.instant(t('PDF.FrsAnalysis'))

		return `${this.accountService.user.name}_${analysis}_${date}`
	}

	private getDefaultPdfEntries(): FrsPdfMappingData[] {
		return [
			{
				fieldName: 'Behandler',
				text: this.accountService.user.name,
			},
			{
				fieldName: 'Auswertung FRS vom',
				text: this.getLocaleFormattedDate(),
			},
		]
	}

	private getLocaleFormattedDate(): string {
		return new Date().toLocaleDateString(this.translateService.currentLang, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
	}
}
