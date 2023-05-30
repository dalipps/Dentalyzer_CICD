import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseService, downloadPdf, getPdfTemplatePath } from '@dentalyzer/common'
import { TranslateService } from '@ngx-translate/core'
import { NoSuchFieldError, PDFCheckBox, PDFDocument, PDFTextField } from 'pdf-lib'
import { Observable, filter, first, from, map, of, switchMap, takeUntil, tap } from 'rxjs'
import { AccountService } from 'src/app/login/account/account.service'
import { PkmEdge } from '../edge/pkm-edge'
import { PkmFacade } from '../store/pkm.facade'
import { PkmAnalysis } from '../store/pkm.model'
import { PkmPdfMappingData } from './pkm-pdf-data.model'
import { pkmPdfMapping } from './pkm-pdf-mapping.config'

export const PKM_TEMPLATE_FILE_NAME = 'PKM-Template'

@Injectable({
	providedIn: 'root',
})
export class PkmPdfService extends BaseService {
	private analysis: PkmAnalysis | undefined

	constructor(
		private translateService: TranslateService,
		private accountService: AccountService,
		private snackBar: MatSnackBar,
		pkmFacade: PkmFacade
	) {
		super()

		pkmFacade.active$
			.pipe(
				takeUntil(this.destroy$),
				tap((analysis) => (this.analysis = analysis))
			)
			.subscribe()
	}

	generatePdf() {
		if (!this.analysis) return
		const pdfEntries = this.getPdfEntries(this.analysis.edges)

		this.getFile$()
			.pipe(
				filter((file): file is ArrayBuffer => !!file),
				switchMap((file) => this.writeFields(pdfEntries, file)),
				first(),
				tap((pdf) => downloadPdf(pdf, this.getFileName()))
			)
			.subscribe()
	}

	private writeFields(pdfEntries: PkmPdfMappingData[], buffer: ArrayBuffer): Observable<Blob> {
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
							// TODO: kann das raus?
						} else if (field instanceof PDFCheckBox) {
							field.check()
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

	private getPdfEntries(edges: PkmEdge[]): PkmPdfMappingData[] {
		const pdfEntries: PkmPdfMappingData[] = this.getDefaultPdfEntries()

		edges.forEach((edge) => {
			const fieldName = pkmPdfMapping[edge.id]
			if (!fieldName || edge.distance === undefined) return

			pdfEntries.push({
				fieldName,
				text: edge.distance.toString(),
			})
		})

		return pdfEntries
	}

	private getFile$(): Observable<ArrayBuffer | undefined> {
		const filePath = getPdfTemplatePath(PKM_TEMPLATE_FILE_NAME)
		return from(fetch(filePath)).pipe(switchMap((pdf) => from(pdf.arrayBuffer())))
	}

	private getFileName(): string {
		const date = this.getLocaleFormattedDate()
		const analysis = this.translateService.instant(t('PDF.PkmAnalysis'))

		return `${this.accountService.user.name}_${analysis}_${date}`
	}

	private getDefaultPdfEntries(): PkmPdfMappingData[] {
		return [
			{
				fieldName: 'Text42',
				text: this.accountService.user.name,
			},
			{
				fieldName: 'Text40',
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
