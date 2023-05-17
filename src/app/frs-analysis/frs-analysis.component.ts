import { AsyncPipe, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseComponent } from '@dentalyzer/common'
import {
	BehaviorSubject,
	EMPTY,
	Observable,
	combineLatest,
	debounceTime,
	filter,
	first,
	fromEvent,
	map,
	of,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs'
import * as THREE from 'three'
import { DialogComponent, DialogData } from '../dialog/dialog.component'
import { FileUploadComponent } from '../file-upload/file-upload.component'
import { convertImageToBase64 } from './image'
import { getNormalizedMousePosition } from './mouse/mouse.utils'
import { FrsRenderingService } from './rendering/frs-rendering.service'
import { ThreeData } from './rendering/three-data.model'
import { FrsAnalysis, FrsFacade } from './store'
import { TabMenuComponent } from './tab-menu/tab-menu.component'

@Component({
	selector: 'dent-frs-analysis',
	standalone: true,
	imports: [NgIf, AsyncPipe, FileUploadComponent, MatDialogModule, TabMenuComponent],
	templateUrl: './frs-analysis.component.html',
	styleUrls: ['./frs-analysis.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrsAnalysisComponent extends BaseComponent {
	@ViewChild('analysisFrsContainer', { read: ElementRef<HTMLDivElement>, static: false })
	container: ElementRef<HTMLDivElement> | undefined
	@ViewChild('analysisFrsCanvas', { read: ElementRef<HTMLCanvasElement>, static: false })
	canvas: ElementRef<HTMLCanvasElement> | undefined

	private imageSubject$ = new BehaviorSubject<string | undefined>(undefined)
	analysis$: Observable<FrsAnalysis | undefined> = EMPTY

	private threeData: ThreeData | undefined
	private raycaster: THREE.Raycaster
	private selectedMarkObject: THREE.Object3D | undefined

	constructor(
		private readonly renderingService: FrsRenderingService,
		dialog: MatDialog,
		frsFacade: FrsFacade,
		injector: Injector
	) {
		super(injector)

		this.analysis$ = combineLatest([frsFacade.active$, this.imageSubject$]).pipe(
			switchMap(([analysis, image]) => {
				if (analysis && !image) {
					const ref = dialog.open(DialogComponent, {
						data: <DialogData>{
							title: this.translateService.instant(t('FrsAnalysis.ExistingAnalysisTitle')),
							content: this.translateService.instant(t('FrsAnalysis.ExistingAnalysisContent')),
							rejectButton: this.translateService.instant(t('Dialog.No')),
							submitButton: this.translateService.instant(t('Dialog.Yes')),
							rejectAction: () => {
								frsFacade.removeAll()
							},
							submitAction: () => this.imageSubject$.next(analysis.image),
						},
					})

					return ref.afterClosed().pipe(map(() => analysis))
				}

				if (!analysis && image) {
					frsFacade.create(image)
					return EMPTY
				}

				return of(analysis)
			})
		)

		combineLatest([this.imageSubject$, this.afterViewInit$])
			.pipe(
				takeUntil(this.destroy$),
				debounceTime(500),
				map(([image]) => [image, this.canvas]),
				filter((array): array is [string, ElementRef<HTMLCanvasElement>] => !!array[0] && !!array[1]),
				switchMap(([image, canvas]) => this.renderingService.initImageRendering(canvas.nativeElement, image)),
				tap((data) => (this.threeData = data))
			)
			.subscribe()

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
	}

	onUploadFiles(fileList: FileList): void {
		convertImageToBase64(fileList[0])
			.pipe(
				first(),
				tap((imageBase64) => this.imageSubject$.next(imageBase64))
			)
			.subscribe()
	}

	onPointerDown(event: PointerEvent): void {
		if (!this.canvas || !this.threeData) return

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
		this.selectedMarkObject = this.getSelectedMark(mousePosition)
	}

	onPointerUp(event: PointerEvent): void {
		if (!this.canvas || !this.threeData) return

		if (this.selectedMarkObject) {
			// TODO: change position of selected mark
			this.threeData.orbitControls.enabled = true
			return
		}

		const mousePosition = getNormalizedMousePosition(this.canvas.nativeElement, event.clientX, event.clientY)
		const intersection = this.getFirstIntersection(mousePosition)

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
		this.renderingService.stopAnimation()
	}

	private getFirstIntersection(v2: THREE.Vector2): THREE.Vector3 | undefined {
		if (!this.threeData) return

		this.raycaster.setFromCamera(v2, this.threeData.camera)
		const intersects = this.raycaster.intersectObject(this.threeData.sprite)

		// TODO: wird das benötigt
		// intersects[0].point.z = 0;

		return intersects[0]?.point
	}

	private getSelectedMark(_mousePosition: THREE.Vector2): THREE.Object3D | undefined {
		// TODO: implement
		console.log('to be implemented', _mousePosition)

		return
	}
}
