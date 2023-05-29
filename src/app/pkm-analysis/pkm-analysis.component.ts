import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { EMPTY, Observable, debounceTime, filter, first, switchMap, takeUntil, tap } from 'rxjs'
import { AnalysisButtonsComponent } from '../analysis-buttons/analysis-buttons.component'
import { BaseComponent } from '../common/base'
import { IndexedDbService, TABLES } from '../common/indexed-db'
import { FileType } from '../file-upload'
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { MeasurementListComponent } from './measurement-list/measurement-list.component'
import { ModelViewButtonsComponent } from './model-view-buttons/model-view-buttons.component'
import { PkmAnalysisService } from './pkm-analysis.service'
import { PkmRenderingService } from './rendering/pkm-rendering.service'
import { PkmFacade } from './store/pkm.facade'
import { PkmAnalysis } from './store/pkm.model'

@Component({
	selector: 'dent-pkm-analysis',
	standalone: true,
	templateUrl: './pkm-analysis.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		FileUploadComponent,
		ModelViewButtonsComponent,
		MeasurementListComponent,
		AnalysisButtonsComponent,
	],
})
export class PkmAnalysisComponent extends BaseComponent implements AfterViewInit {
	readonly supportedFileTypes = [FileType.STL]
	analysis$: Observable<PkmAnalysis | undefined> = EMPTY

	@ViewChild('analysisPkmCanvas', { read: ElementRef<HTMLCanvasElement>, static: false })
	canvas: ElementRef<HTMLCanvasElement> | undefined

	constructor(
		private readonly renderingService: PkmRenderingService,
		private dbService: IndexedDbService,
		private analysisService: PkmAnalysisService,
		private pkmFacade: PkmFacade,
		injector: Injector
	) {
		super(injector)

		this.analysis$ = analysisService.analysis$
	}

	ngAfterViewInit(): void {
		this.analysisService.hasCurrentAnalysis$
			.pipe(
				debounceTime(0),
				filter((x) => !!x),
				takeUntil(this.destroy$),
				switchMap(() => this.analysisService.analysis$.pipe(first())),
				filter((analysis): analysis is { id: string; modelId: string } => !!analysis?.id && !!analysis?.modelId),
				switchMap((analysis) => this.dbService.getOne<{ id: string; file: File }>(TABLES.PKM_FILE, analysis.modelId)),
				filter((model) => !!model),
				tap(({ file }) => {
					if (this.canvas && file) {
						this.renderingService.render(this.canvas.nativeElement, file)
					}
				})
			)
			.subscribe()
	}

	loadFile(files: FileList): void {
		this.analysisService.uploadPkm(files)
	}

	removeAnalysis() {
		this.analysisService.resetAnalysis()
	}

	onPointerUp(event: PointerEvent) {
		console.log('up', event)
	}

	onPointerDown(event: PointerEvent) {
		console.log('down', event)
	}

	onPointerOut(event: PointerEvent) {
		console.log('event', event)
	}

	onPointerCancel() {
		console.log('cancel')
	}
}
