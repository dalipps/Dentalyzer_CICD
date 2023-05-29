import { CommonModule, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnDestroy, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseComponent } from '@dentalyzer/common'
import { TranslateModule } from '@ngx-translate/core'
import { DialogComponent, DialogData } from '../dialog/dialog.component'
import { FrsFacade } from '../frs-analysis/store'

@Component({
	selector: 'dent-analysis-buttons',
	standalone: true,
	imports: [CommonModule, MatButtonModule, NgIf, TranslateModule, MatIconModule],
	templateUrl: './analysis-buttons.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisButtonsComponent extends BaseComponent implements OnDestroy {
	@Input() disabled = false
	private dialogRef: MatDialogRef<DialogComponent, unknown> | undefined

	@Output() downloadPdf = new EventEmitter()
	@Output() resetAnalysis = new EventEmitter()

	constructor(private dialog: MatDialog, private frsFacade: FrsFacade, injector: Injector) {
		super(injector)
	}

	onNewAnalysis() {
		this.dialogRef = this.dialog.open(DialogComponent, {
			data: <DialogData>{
				title: this.translateService.instant(t('AnalysisButtons.NewAnalysisTitle')),
				content: this.translateService.instant(t('AnalysisButtons.NewAnalysisContent')),
				rejectButton: this.translateService.instant(t('Dialog.Cancel')),
				submitButton: this.translateService.instant(t('Dialog.Submit')),
				submitAction: () => this.resetAnalysis.emit(),
				rejectAction: () => this.dialogRef?.close(),
			},
		})
	}

	onDownloadPdf(): void {
		this.downloadPdf.emit()
	}

	override ngOnDestroy() {
		super.ngOnDestroy()

		this.dialogRef?.close()
	}
}
