import { DragDropModule } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { DndDirective } from './dnd/dnd.directive'
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
	supportedFileTypes?: string

	@Output() uploadedFiles = new EventEmitter<FileList>()
	@Input() set acceptFileTypes(types: FileType[]) {
		this.supportedFileTypes = types.join(',')
	}

	onFileDropped(fileList: FileList): void {
		if (this.isSupportedFileType(fileList[0])) {
			// TODO: show error unsupported type
			return
		}

		this.uploadedFiles.emit(fileList)
	}

	fileBrowseHandler(event: Event) {
		const fileList = (event.target as HTMLInputElement).files
		if (fileList && fileList.length) this.uploadedFiles.emit(fileList)
	}

	openFileExplorer(): void {
		document.getElementById('fileDropRef')?.click()
	}

	private isSupportedFileType(file: File) {
		return this.supportedFileTypes?.includes(file.type)
	}
}
