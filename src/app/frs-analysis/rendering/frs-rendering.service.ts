import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { first, from, fromEvent, skip, takeUntil, tap } from 'rxjs'
import { BaseRenderingService } from 'src/app/common/base/base.rendering.service'
import {
	Box3,
	Color,
	MOUSE,
	Object3D,
	PerspectiveCamera,
	Raycaster,
	Scene,
	Sprite,
	SpriteMaterial,
	Texture,
	TextureLoader,
	Vector3,
	WebGLRenderer,
} from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FrsMarkType, FrsPosition } from '../mark'
import { frsMarkTypeMapping } from '../marker-list/frs-mark-type.pipe'
import { FrsAnalysis } from '../store'
import { ObjectType } from './marker.model'
import { getLabel, getMarkerMesh } from './marker.utils'

interface HoverEvent {
	object: Object3D
}

@Injectable({
	providedIn: 'root',
})
export class FrsRenderingService extends BaseRenderingService {
	private sprite?: Sprite
	private isLabelInitiallyVisible = false

	constructor(private translateService: TranslateService) {
		super()

		this.translateService.onLangChange
			.pipe(
				takeUntil(this.destroy$),
				skip(1),
				tap(() => this.retranslateLabels())
			)
			.subscribe()
	}

	initImageRendering(canvas: HTMLCanvasElement, analysis: FrsAnalysis) {
		from(new TextureLoader().loadAsync(analysis.image))
			.pipe(
				first(),
				tap((frsTexture) => {
					this.canvas = canvas

					this.initSprite(frsTexture)
					this.initScene()
					this.initCamera()
					this.initRenderer()
					this.initOrbitControls()
					this.raycaster = new Raycaster()

					this.startAnimation()

					this.redrawExistingData(analysis)
				})
			)
			.subscribe()
	}

	getFirstIntersection(mousePosition: THREE.Vector2, object: Object3D): FrsPosition | undefined {
		if (!this.camera || !this.raycaster) return

		this.raycaster.setFromCamera(mousePosition, this.camera)
		const firstIntersection = this.raycaster.intersectObject(object)[0]

		if (!firstIntersection) return

		return {
			x: firstIntersection.point.x,
			y: firstIntersection.point.y,
			z: firstIntersection.point.z,
		}
	}

	toggleOrbitControls(enabled: boolean): void {
		if (!this.orbitControls) return

		this.orbitControls.enabled = enabled
	}

	removeLabel(markId: FrsMarkType) {
		if (!this.scene) return

		const label = this.getSceneChild(ObjectType.Label, markId)
		if (label) this.scene.remove(label)
	}

	addMarker(position: FrsPosition, markId: FrsMarkType, showLabel: boolean): void {
		this.addMarkMeshToScene(position, markId, showLabel)
		this.addDragControls()
	}

	toggleLabelOfMark(markId: FrsMarkType, isVisible: boolean) {
		const label = this.getSceneChild(ObjectType.Label, markId)
		if (label) {
			label.visible = isVisible
		}
	}

	removeMarker(markId: FrsMarkType): void {
		const marker: Object3D | undefined = this.getSceneChild(ObjectType.Marker, markId)
		if (marker) {
			this.scene?.remove(marker)
		}

		this.removeLabel(markId)
	}

	getSceneChild(objectType: ObjectType, markId?: FrsMarkType): THREE.Object3D | undefined {
		return this.scene?.children
			.filter((m) => (markId ? markId === m.userData['markId'] : true))
			.find((m) => m.userData['objectType'] === objectType)
	}

	getSceneChildren(objectType: ObjectType, markId?: FrsMarkType): THREE.Object3D[] | undefined {
		return this.scene?.children
			.filter((m) => m.userData['objectType'] === objectType)
			.filter((m) => (markId ? markId === m.userData['markId'] : true))
	}

	addDragControls() {
		if (!this.camera || !this.renderer || !this.scene) return
		if (this.dragControls) this.dragControls.dispose()

		const allMarkers = this.getSceneChildren(ObjectType.Marker) ?? []

		this.dragControls = new DragControls(allMarkers, this.camera, this.renderer.domElement)

		this.addHoverOnListener(this.dragControls)
		this.addHoverOffListener(this.dragControls)
	}

	private addHoverOnListener(dragControls: DragControls) {
		fromEvent(dragControls, 'hoveron')
			.pipe(
				takeUntil(this.destroy$),
				tap((event: unknown) => {
					const marker = (event as HoverEvent).object
					const markId = <FrsMarkType | undefined>marker.userData['markId']
					const label = this.getSceneChild(ObjectType.Label, markId)

					this.isLabelInitiallyVisible = !!label?.visible

					if (!markId) return
					this.toggleLabelOfMark(markId, true)
				})
			)
			.subscribe()
	}

	private addHoverOffListener(dragControls: DragControls) {
		fromEvent(dragControls, 'hoveroff')
			.pipe(
				takeUntil(this.destroy$),
				tap((event: unknown) => {
					if (this.isLabelInitiallyVisible) {
						this.isLabelInitiallyVisible = false
						return
					}

					const marker = (event as HoverEvent).object
					const markId = <FrsMarkType | undefined>marker.userData['markId']

					if (!markId) return
					this.toggleLabelOfMark(markId, false)
				})
			)
			.subscribe()
	}

	private retranslateLabels(): void {
		const allLabels = this.getSceneChildren(ObjectType.Label)

		allLabels?.forEach((existingLabel) => {
			const markId = <FrsMarkType | undefined>existingLabel.userData['markId']
			const markerPosition = <FrsPosition | undefined>existingLabel.userData['markerPosition']
			if (markId && markerPosition) {
				const labelText = this.translateService.instant(frsMarkTypeMapping[markId].abbreviation)

				const newLabel = getLabel(labelText, markId, markerPosition, existingLabel.visible)
				if (newLabel) {
					this.scene?.remove(existingLabel)
					this.scene?.add(newLabel)
				}
			}
		})
	}

	private redrawExistingData(analysis: FrsAnalysis) {
		analysis.marks
			.filter((m) => !!m.position)
			.forEach((m) => {
				if (!m.position) return
				this.addMarkMeshToScene(m.position, m.id, false)
				this.addDragControls()
			})
	}

	private addMarkMeshToScene(position: FrsPosition, markId: FrsMarkType, showLabel: boolean) {
		const markerMesh = getMarkerMesh(markId, position)

		const labelText = this.translateService.instant(frsMarkTypeMapping[markId].abbreviation)
		const label = getLabel(labelText, markId, position)

		if (label) label.visible = showLabel

		this.scene?.add(markerMesh)
		if (label) this.scene?.add(label)
	}

	private initSprite(frsTexture: Texture) {
		const {
			image: { width, height },
		} = frsTexture
		const material = new SpriteMaterial({ map: frsTexture })
		const sprite = new Sprite(material)
		sprite.scale.set(100, 100 * (height / width), 100)
		sprite.position.set(0, 0, 0)
		sprite.userData = { objectType: ObjectType.Model }
		sprite.name = 'Image'

		this.sprite = sprite
	}

	private initScene() {
		const scene = new Scene()
		scene.background = new Color('#ffffff')

		if (this.sprite) {
			scene.add(this.sprite)
		}

		this.scene = scene
	}

	private initCamera() {
		if (!this.canvas || !this.sprite) {
			return
		}
		const { offsetWidth, offsetHeight } = this.canvas
		const camera = new PerspectiveCamera(45, offsetWidth / offsetHeight, 0.1, 1000)
		camera.updateProjectionMatrix()

		const boundingBox = new Box3().setFromObject(this.sprite)
		const size = new Vector3()
		boundingBox.getSize(size)
		const z = (0.5 * (size.y * 1.5)) / Math.tan((22.5 * Math.PI) / 180)
		camera.position.set(0, 0, z)

		this.camera = camera
	}

	private initOrbitControls() {
		if (!this.camera || !this.renderer) {
			return
		}

		const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
		orbitControls.mouseButtons.RIGHT = MOUSE.PAN
		orbitControls.mouseButtons.LEFT = MOUSE.PAN
		orbitControls.enableRotate = false
		orbitControls.maxDistance = this.camera.position.distanceTo(orbitControls.target)
		orbitControls.minDistance = 15

		orbitControls.update()

		this.orbitControls = orbitControls
	}

	private initRenderer() {
		if (!this.canvas || !this.camera || !this.scene) {
			return
		}
		const { offsetWidth, offsetHeight } = this.canvas
		const renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(offsetWidth, offsetHeight)
		renderer.render(this.scene, this.camera)

		this.renderer = renderer
	}
}
