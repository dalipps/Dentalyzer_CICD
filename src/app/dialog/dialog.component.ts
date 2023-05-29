import { NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'

export interface DialogData {
	title: string
	content: string
	rejectButton?: string
	submitButton?: string
	rejectAction?: () => void
	submitAction?: () => void
}

@Component({
	selector: 'dent-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, NgIf],
	templateUrl: './dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
	rejectButton: string
	submitButton: string
	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly data: DialogData,
		dialogRef: MatDialogRef<DialogComponent>,
		private translate: TranslateService
	) {
		dialogRef.disableClose = true
		this.submitButton = data.submitButton ?? this.translate.instant(t('Dialog.Yes'))
		this.rejectButton = data.rejectButton ?? this.translate.instant(t('Dialog.No'))
	}

	onSubmit(): void {
		if (this.data.submitAction) this.data.submitAction()
	}

	onReject(): void {
		if (this.data.rejectAction) this.data.rejectAction()
	}
}
