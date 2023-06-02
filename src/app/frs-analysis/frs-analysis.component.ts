import { AsyncPipe, NgIf } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { BaseComponent } from '@dentalyzer/common'
import {
	EMPTY,
	Observable,
	debounceTime,
	filter,
	first,
	fromEvent,
	map,
	pairwise,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs'
import * as THREE from 'three'
import { AnalysisButtonsComponent } from '../analysis-buttons'
import { FileType } from '../file-upload'
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { FrsAnalysisService } from './frs-analysis.service'
import { FrsMarkType } from './mark'
import { getNormalizedMousePosition } from './mouse/mouse.utils'
import { FrsPdfService } from './pdf/frs-pdf.service'
import { FrsRenderingService } from './rendering'
import { FrsAnalysis } from './store'
import { TabMenuComponent } from './tab-menu/tab-menu.component'

@Component({
	selector: 'dent-frs-analysis',
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		FileUploadComponent,
		AnalysisButtonsComponent,
		TabMenuComponent,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './frs-analysis.component.html',
	styleUrls: ['./frs-analysis.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrsAnalysisComponent extends BaseComponent implements AfterViewInit {
	@ViewChild('analysisFrsContainer', { read: ElementRef<HTMLDivElement>, static: false })
	container: ElementRef<HTMLDivElement> | undefined
	@ViewChild('analysisFrsCanvas', { read: ElementRef<HTMLCanvasElement>, static: false })
	canvas: ElementRef<HTMLCanvasElement> | undefined

	analysis$: Observable<FrsAnalysis | undefined> = EMPTY
	selectedMarkId$: Observable<FrsMarkType | undefined> = EMPTY

	readonly supportedFileTypes = [FileType.JPEG]
	private selectedMarker: THREE.Object3D | undefined
	private selectedMarkId: FrsMarkType | undefined
	private analysis: FrsAnalysis | undefined
	private wasFastClick = true
	private checkFastClickTime: number | undefined
	private readonly fastClickDetectionTime = 300

	constructor(
		private readonly renderingService: FrsRenderingService,
		private frsService: FrsAnalysisService,
		private frsPdfService: FrsPdfService,
		injector: Injector
	) {
		super(injector)

		this.analysis$ = frsService.analysis$.pipe(tap((analysis) => (this.analysis = analysis)))

		this.selectedMarkId$ = frsService.selectedMarkId$.pipe(
			tap((markId) => (this.selectedMarkId = markId)),
			pairwise(),
			tap(([oldMarkId, newMarkId]) => {
				if (oldMarkId) this.renderingService.toggleLabelOfMark(oldMarkId, false)
				if (newMarkId) this.renderingService.toggleLabelOfMark(newMarkId, true)
			}),
			map(([, newMarkId]) => newMarkId)
		)

		fromEvent(window, 'resize')
			.pipe(
				takeUntil(this.destroy$),
				tap(() => {
					if (!this.canvas || !this.container) return

					this.canvas.nativeElement.style.width = this.container.nativeElement.getBoundingClientRect().width + 'px'
					this.canvas.nativeElement.style.height = this.container.nativeElement.getBoundingClientRect().height + 'px'
				})
			)
			.subscribe()
	}

	ngAfterViewInit(): void {
		this.frsService.newAnalysisSet$
			.pipe(
				debounceTime(10),
				filter((x) => !!x),
				takeUntil(this.destroy$),
				switchMap(() => this.analysis$.pipe(first())),
				map((analysis) => [analysis, this.canvas]),
				filter((array): array is [FrsAnalysis, ElementRef<HTMLCanvasElement>] => !!array[0] && !!array[1]),
				tap(([analysis, canvas]) => this.renderingService.initImageRendering(canvas.nativeElement, analysis))
			)
			.subscribe()
	}

	onUploadFiles(fileList: FileList): void {
		this.frsService.hanleFilesUpload(fileList)
	}

	onResetAnalysis() {
		this.frsService.reset()
	}

	onDownloadPdf() {
		this.frsPdfService.generatePdf()
	}

	onPointerDown(event: PointerEvent): void {
		if (!this.canvas) return

		this.startClickTest()

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)

		this.selectedMarker = this.frsService.checkSelectedMarker(mousePosition)
		const isGenerated: boolean | undefined = this.selectedMarker?.userData['isGenerated']

		if (isGenerated) {
			this.selectedMarker = undefined
			return
		}

		if (this.selectedMarker) {
			const markId: FrsMarkType | undefined = this.selectedMarker.userData['markId']
			if (markId) {
				this.renderingService.toggleLabelOfMark(markId, false)
				this.frsService
					.getMarkForMarker(markId)
					.pipe(
						first(),
						tap((mark) => {
							if (mark) this.renderingService.toggleEdges(mark.edgeTypes, false)
						})
					)
					.subscribe()
			}

			this.renderingService.toggleOrbitControls(false)
		}
	}

	onPointerUp(event: PointerEvent): void {
		if (!this.canvas) return
		this.endClickTest()

		if (this.selectedMarker && !this.wasFastClick) {
			const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
			const markId = <FrsMarkType | undefined>this.selectedMarker.userData['markId']
			if (markId) this.frsService.resetMarker(markId, mousePosition, this.selectedMarkId === markId)
			this.renderingService.toggleOrbitControls(true)

			this.frsService.setSelectedMarkId(markId)

			this.selectedMarker = undefined

			return
		}

		const isGenerated = !!this.analysis?.marks.find((m) => m.id === this.selectedMarkId)?.generationData

		if (this.wasFastClick && !isGenerated) {
			const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
			this.frsService.addMarker(mousePosition)
		}

		this.renderingService.toggleOrbitControls(true)
	}

	onPointerOut(event: PointerEvent): void {
		if (!this.canvas || !this.selectedMarker) return
		this.endClickTest()

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
		const markId = <FrsMarkType | undefined>this.selectedMarker.userData['markId']
		if (markId) this.frsService.resetMarker(markId, mousePosition, this.selectedMarkId === markId)

		this.renderingService.toggleOrbitControls(true)
		this.selectedMarker = undefined
	}

	onPointerCancel(): void {
		this.endClickTest()
		this.renderingService.toggleOrbitControls(true)
		this.selectedMarker = undefined
	}

	onTabChanged() {
		this.frsService.setSelectedMarkId(undefined)
	}

	override ngOnDestroy(): void {
		super.ngOnDestroy()
		this.renderingService.stopAnimation()
		this.frsService.setSelectedMarkId(undefined)
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
