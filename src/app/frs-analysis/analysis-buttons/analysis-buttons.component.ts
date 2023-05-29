import { CommonModule, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Injector, Input, OnDestroy } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseComponent } from '@dentalyzer/common'
import { TranslateModule } from '@ngx-translate/core'
import { DialogComponent, DialogData } from 'src/app/dialog/dialog.component'
import { FrsPdfService } from '../pdf/frs-pdf.service'
import { FrsFacade } from '../store'

@Component({
	selector: 'dent-analysis-buttons',
	standalone: true,
	imports: [CommonModule, MatButtonModule, NgIf, TranslateModule, MatIconModule],
	templateUrl: './analysis-buttons.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisButtonsComponent extends BaseComponent implements OnDestroy {
	@Input() showButtons = false
	private dialogRef: MatDialogRef<DialogComponent, unknown> | undefined

	constructor(
		private frsPdfService: FrsPdfService,
		private dialog: MatDialog,
		private frsFacade: FrsFacade,
		injector: Injector
	) {
		super(injector)
	}

	handleNewAnalysis() {
		this.dialogRef = this.dialog.open(DialogComponent, {
			data: <DialogData>{
				title: this.translateService.instant(t('AnalysisButtons.NewAnalysisTitle')),
				content: this.translateService.instant(t('AnalysisButtons.NewAnalysisContent')),
				rejectButton: this.translateService.instant(t('Dialog.Cancel')),
				submitButton: this.translateService.instant(t('Dialog.Submit')),
				submitAction: () => this.frsFacade.removeAll(),
				rejectAction: () => undefined,
			},
		})
	}

	downloadPdf(): void {
		this.frsPdfService.generatePdf()
	}

	override ngOnDestroy() {
		super.ngOnDestroy()

		this.dialogRef?.close()
	}
}
