import { DragDropModule } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { DndDirective } from '../common/dnd/dnd.directive'
import { FileType } from './file-type.enum'

@Component({
	selector: 'dent-file-upload',
	standalone: true,
	imports: [MatButtonModule, DragDropModule, DndDirective, MatIconModule, TranslateModule],
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
	@Output() uploadedFiles = new EventEmitter<FileList>()
	@Input() set acceptFileTypes(types: FileType[]) {
		this.transformedFileTypes = this.transformFileTypes(types)
	}

	transformedFileTypes = this.transformFileTypes([FileType.JPEG])

	onFileDropped(fileList: FileList): void {
		const firstFile = fileList[0]
		const secondFile = fileList[1]

		// TODO: show error unsupported type
		if ([firstFile, secondFile].some((file) => !this.transformedFileTypes.includes(file.type))) return

		this.uploadedFiles.emit(fileList)
	}

	fileBrowseHandler(event: Event) {
		const fileList = (event.target as HTMLInputElement).files
		if (fileList && fileList.length) this.uploadedFiles.emit(fileList)
	}

	openFileExplorer(): void {
		document.getElementById('fileDropRef')?.click()
	}

	private transformFileTypes(fileTypes: FileType[]): string {
		return fileTypes.join(', ')
	}
}
