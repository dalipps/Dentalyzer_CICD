import { AsyncPipe, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { ThreeData } from '@dentalyzer/models'
import { RenderingService } from '@dentalyzer/services'
import { getFirstIntersection, getNormalizedMousePosition, getSelectedMark } from '@dentalyzer/utils'
import { BehaviorSubject, combineLatest, debounceTime, filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs'
import { BaseComponent } from 'src/app/common/base'
import * as THREE from 'three'
import { FileUploadComponent } from '../file-upload/file-upload.component'

@Component({
	selector: 'dent-analysis-frs',
	standalone: true,
	imports: [NgIf, AsyncPipe, FileUploadComponent],
	templateUrl: './analysis-frs.component.html',
	styleUrls: ['./analysis-frs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisFrsComponent extends BaseComponent {
	@ViewChild('analysisFrsContainer', { read: ElementRef<HTMLDivElement>, static: false })
	container: ElementRef<HTMLDivElement> | undefined
	@ViewChild('analysisFrsCanvas', { read: ElementRef<HTMLCanvasElement>, static: false })
	canvas: ElementRef<HTMLCanvasElement> | undefined

	imageSubject$ = new BehaviorSubject<File | undefined>(undefined)

	private threeData: ThreeData | undefined
	private raycaster: THREE.Raycaster
	private selectedMarkObject: THREE.Object3D | undefined

	constructor(private readonly renderingService: RenderingService, injector: Injector) {
		super(injector)

		this.raycaster = new THREE.Raycaster()

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

		combineLatest([this.imageSubject$, this.afterViewInit$])
			.pipe(
				takeUntil(this.destroy$),
				debounceTime(500),
				map(([image]) => [image, this.canvas]),
				filter((array): array is [File, ElementRef<HTMLCanvasElement>] => !!array[0] && !!array[1]),
				switchMap(([file, canvas]) => this.renderingService.initImageRendering(canvas.nativeElement, file)),
				tap((data) => (this.threeData = data))
			)
			.subscribe()
	}

	onUploadFiles(fileList: FileList): void {
		this.imageSubject$.next(fileList[0])
	}

	onPointerDown(event: PointerEvent): void {
		if (!this.canvas || !this.threeData) return

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
		this.selectedMarkObject = getSelectedMark(
			mousePosition,
			this.raycaster,
			this.threeData.camera,
			this.threeData.scene
		)
	}

	onPointerUp(event: PointerEvent): void {
		if (!this.canvas || !this.threeData) return

		if (this.selectedMarkObject) {
			// TODO: change position of selected mark
			this.threeData.orbitControls.enabled = true
			return
		}

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
		const intersection = getFirstIntersection(
			mousePosition,
			this.threeData.sprite,
			this.raycaster,
			this.threeData.camera
		)

		if (intersection) {
			// TODO: create mark object with userData: id should be the uuid of the select mark from the sidebar
		}

		this.threeData.orbitControls.enabled = true
	}

	onPointerMove(): void {
		if (!this.threeData) return
		this.threeData.orbitControls.enabled = true
	}

	onPointerOut(): void {
		if (!this.threeData) return

		// TODO: set marker on last position
		this.threeData.orbitControls.enabled = true
	}

	onPointerCancel(): void {
		if (!this.threeData) return

		this.threeData.orbitControls.enabled = true
		this.selectedMarkObject = undefined
	}

	override ngOnDestroy(): void {
		this.renderingService.cancelAnimation()
	}
}
