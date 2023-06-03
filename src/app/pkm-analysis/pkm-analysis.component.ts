import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { EMPTY, Observable, combineLatest, debounceTime, filter, first, of, switchMap, takeUntil, tap } from 'rxjs'
import { AnalysisButtonsComponent } from '../analysis-buttons/analysis-buttons.component'
import { BaseComponent } from '../common/base'
import { IndexedDbService, TABLES } from '../common/indexed-db'
import { FileType } from '../file-upload'
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { EdgesListComponent } from './edges-list/edges-list.component'
import { ModelViewButtonsComponent } from './model-view-buttons/model-view-buttons.component'
import { getNormalizedMousePosition } from './mouse/mouse.utils'
import { PkmPdfService } from './pdf'
import { PkmAnalysisService } from './pkm-analysis.service'
import { PkmRenderingService } from './rendering/pkm-rendering.service'
import { PkmAnalysis } from './store/pkm.model'

@Component({
	selector: 'dent-pkm-analysis',
	standalone: true,
	templateUrl: './pkm-analysis.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, FileUploadComponent, ModelViewButtonsComponent, AnalysisButtonsComponent, EdgesListComponent],
})
export class PkmAnalysisComponent extends BaseComponent implements AfterViewInit {
	readonly supportedFileTypes = [FileType.STL]
	private wasFastClick = true
	private checkFastClickTime: number | undefined
	private readonly fastClickDetectionTime = 300

	analysis$: Observable<PkmAnalysis | undefined> = EMPTY

	@ViewChild('analysisPkmCanvas', { read: ElementRef<HTMLCanvasElement>, static: false })
	canvas: ElementRef<HTMLCanvasElement> | undefined

	constructor(
		private readonly renderingService: PkmRenderingService,
		private dbService: IndexedDbService,
		private analysisService: PkmAnalysisService,
		private pkmPdfService: PkmPdfService,
		injector: Injector
	) {
		super(injector)

		this.analysis$ = analysisService.analysis$
	}

	ngAfterViewInit(): void {
		this.analysisService.newAnalysisSet$
			.pipe(
				debounceTime(0),
				filter((x) => !!x),
				takeUntil(this.destroy$),
				switchMap(() => this.analysis$.pipe(first())),
				filter((analysis): analysis is Required<PkmAnalysis> => !!analysis?.modelId),
				switchMap((analysis) =>
					combineLatest([
						this.dbService.getOne<{ id: string; file: File }>(TABLES.PKM_FILE, analysis.modelId),
						of(analysis),
					]).pipe(first())
				),
				filter(([model]) => !!model),
				tap(([{ file }, analysis]) => {
					if (this.canvas && file) {
						this.renderingService.render(this.canvas.nativeElement, file, analysis)
					}
				})
			)
			.subscribe()
	}

	onDownloadPdf() {
		this.pkmPdfService.generatePdf()
	}

	loadFile(files: FileList): void {
		this.analysisService.uploadPkm(files)
	}

	removeAnalysis() {
		this.analysisService.resetAnalysis()
	}

	onPointerUp(event: PointerEvent) {
		this.endClickTest()
		const selectedEdge = this.analysisService.selectedEdge
		if (!this.canvas || !selectedEdge) return

		if (this.wasFastClick && (!selectedEdge.mark1 || !selectedEdge.mark2)) {
			const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
			this.analysisService.addMark(mousePosition)
		}
	}

	onPointerDown() {
		this.startClickTest()
	}

	onPointerCancel() {
		this.endClickTest()
	}

	private startClickTest(): void {
		this.checkFastClickTime = new Date().getTime()
	}

	private endClickTest(): void {
		if (!this.checkFastClickTime) return

		this.wasFastClick = new Date().getTime() - this.checkFastClickTime < this.fastClickDetectionTime
		this.checkFastClickTime = undefined
	}
}
