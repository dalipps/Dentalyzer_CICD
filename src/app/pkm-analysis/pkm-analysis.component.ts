import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { BehaviorSubject, Observable, combineLatest, debounceTime, takeUntil, tap } from 'rxjs'
import { BaseComponent } from '../common/base'
import { FileType } from '../file-upload'
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { PkmRenderingService } from './rendering/pkm-rendering.service'

@Component({
	selector: 'dent-pkm-analysis',
	standalone: true,
	templateUrl: './pkm-analysis.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, FileUploadComponent],
})
export class PkmAnalysisComponent extends BaseComponent {
	supportedFileTypes = [FileType.STL]

	@ViewChild('analysisFrsCanvas', { read: ElementRef<HTMLCanvasElement>, static: false })
	canvas: ElementRef<HTMLCanvasElement> | undefined

	pkmSubject$ = new BehaviorSubject<File | undefined>(undefined)

	constructor(private readonly renderingService: PkmRenderingService, injector: Injector) {
		super(injector)

		combineLatest([this.pkmSubject$, this.afterViewInit$])
			.pipe(
				takeUntil(this.destroy$),
				debounceTime(500),
				tap(([pkm]) => {
					if (this.canvas && pkm) {
						this.renderingService.render(this.canvas.nativeElement, pkm)
					}
				})
			)
			.subscribe()
	}

	override ngAfterViewInit(): void {
		this.onFileLoaded().pipe(takeUntil(this.destroy$)).subscribe()
	}

	onFileLoaded(): Observable<File | undefined> {
		return this.pkmSubject$.pipe(
			tap((pkm) => this.canvas && pkm && this.renderingService.render(this.canvas.nativeElement, pkm))
		)
	}

	loadFile(files: FileList): void {
		this.pkmSubject$.next(files[0])
	}
}
