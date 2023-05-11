import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

export interface DialogData {
	title: string
	content: string
	rejectButton: string
	submitButton: string
	rejectAction?: () => void
	submitAction?: () => void
}

@Component({
	selector: 'dent-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public readonly data: DialogData, dialogRef: MatDialogRef<DialogComponent>) {
		dialogRef.disableClose = true
	}

	onSubmit(): void {
		if (this.data.submitAction) this.data.submitAction()
	}

	onReject(): void {
		if (this.data.rejectAction) this.data.rejectAction()
	}
}
