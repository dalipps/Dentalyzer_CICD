import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core'

@Directive({
	selector: '[dentDnd]',
	standalone: true,
})
export class DndDirective {
	@HostBinding('class.animate-shake') fileOver = false
	@Output() filesDropped = new EventEmitter<FileList>()

	@HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
		evt.preventDefault()
		evt.stopPropagation()
		this.fileOver = true
	}

	@HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent) {
		evt.preventDefault()
		evt.stopPropagation()
		this.fileOver = false
	}

	@HostListener('drop', ['$event']) ondrop(evt: DragEvent) {
		evt.preventDefault()
		evt.stopPropagation()
		this.fileOver = false
		const files = evt.dataTransfer?.files

		if (files && files.length > 0) this.filesDropped.emit(files)
	}
}
