import { AsyncPipe, NgIf } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { BaseComponent } from '@dentalyzer/common'
import { EMPTY, Observable, debounceTime, filter, first, fromEvent, map, pairwise, takeUntil, tap } from 'rxjs'
import * as THREE from 'three'
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { FrsAnalysisService } from './frs-analysis.service'
import { FrsMarkType } from './mark'
import { getNormalizedMousePosition } from './mouse/mouse.utils'
import { FrsRenderingService } from './rendering/frs-rendering.service'
import { FrsAnalysis } from './store'
import { TabMenuComponent } from './tab-menu/tab-menu.component'

@Component({
	selector: 'dent-frs-analysis',
	standalone: true,
	imports: [NgIf, AsyncPipe, FileUploadComponent, TabMenuComponent],
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

	private selectedMarker: THREE.Object3D | undefined
	private selectedMarkId: FrsMarkType | undefined

	private wasFastClick = true
	private checkFastClickTime: number | undefined
	private readonly fastClickDetectionTime = 100

	constructor(
		private readonly renderingService: FrsRenderingService,
		private frsService: FrsAnalysisService,
		injector: Injector
	) {
		super(injector)

		this.analysis$ = frsService.analysis$

		frsService.selectedMarkId$
			.pipe(
				takeUntil(this.destroy$),
				tap((markId) => (this.selectedMarkId = markId)),
				pairwise(),
				tap(([oldMarkId, newMarkId]) => {
					if (oldMarkId) this.renderingService.toggleLabelOfMark(oldMarkId, false)
					if (newMarkId) this.renderingService.toggleLabelOfMark(newMarkId, true)
				})
			)
			.subscribe()

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

	override ngAfterViewInit(): void {
		super.ngAfterViewInit()

		this.analysis$
			.pipe(
				debounceTime(10),
				filter((x) => !!x),
				first(),
				map((analysis) => [analysis, this.canvas]),
				filter((array): array is [FrsAnalysis, ElementRef<HTMLCanvasElement>] => !!array[0] && !!array[1]),
				tap(([analysis, canvas]) => this.renderingService.initImageRendering(canvas.nativeElement, analysis))
			)
			.subscribe()
	}

	onUploadFiles(fileList: FileList): void {
		this.frsService.hanleFilesUpload(fileList)
	}

	onPointerDown(event: PointerEvent): void {
		if (!this.canvas) return

		this.startClickTest()

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)

		this.selectedMarker = this.frsService.checkSelectedMarker(mousePosition)

		if (this.selectedMarker) {
			const markId = this.selectedMarker.userData['markId']
			this.renderingService.toggleLabelOfMark(markId, false)
		}

		if (this.selectedMarker) this.renderingService.toggleOrbitControls(false)
	}

	onPointerUp(event: PointerEvent): void {
		if (!this.canvas) return
		this.endClickTest()

		if (this.selectedMarker && !this.wasFastClick) {
			const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
			const markId = <FrsMarkType | undefined>this.selectedMarker.userData['markId']
			if (markId) this.frsService.resetMarker(markId, mousePosition, this.selectedMarkId === markId)
			this.renderingService.toggleOrbitControls(true)

			this.selectedMarker = undefined

			return
		}

		if (this.wasFastClick) {
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
