import { Injectable } from '@angular/core'
import { BaseRenderingService, SerializableVector3 } from '@dentalyzer/common'
import { first, tap } from 'rxjs'
import {
	BufferGeometry,
	Color,
	Material,
	Mesh,
	MeshPhongMaterial,
	Raycaster,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three'
import { PkmEdge, PkmEdgeType } from '../edge/pkm-edge'
import { PkmAnalysis } from '../store'
import { getEdge, getMarker } from './pkm-rendering.utils'
import { initLight, parseStlToGeometry } from './pkm.utils'
import { initCamera, initOrbitControls } from './scene.utils'

@Injectable({
	providedIn: 'root',
})
export class PkmRenderingService extends BaseRenderingService {
	private readonly jawMaterial = new MeshPhongMaterial({
		color: 0xcccccc,
		opacity: 0.8,
		transparent: true,
	})
	private lowerJaw?: Mesh
	private upperJaw?: Mesh
	constructor() {
		super()
	}

	render(canvas: HTMLCanvasElement, file: File, analysis: PkmAnalysis): void {
		parseStlToGeometry(file)
			.pipe(
				first(),
				tap((geometry) => {
					this.initModel(geometry)
					this.initScene(canvas)
					this.initRenderer()
					this.raycaster = new Raycaster()

					this.startAnimation()

					this.redrawExistingData(analysis)
				})
			)
			.subscribe()
	}

	showLowerJaw(state: boolean) {
		if (this.lowerJaw) {
			this.lowerJaw.visible = state
		}
	}

	showUpperJaw(state: boolean) {
		if (this.upperJaw) {
			this.upperJaw.visible = state
		}
	}

	getFirstIntersection(mousePosition: Vector2): Vector3 | undefined {
		if (!(this.upperJaw?.visible || this.lowerJaw?.visible) || !this.raycaster || !this.camera) return

		const visibleJawParts: Mesh<BufferGeometry, Material | Material[]>[] = []

		if (this.upperJaw?.visible) visibleJawParts.push(this.upperJaw)
		if (this.lowerJaw?.visible) visibleJawParts.push(this.lowerJaw)

		this.raycaster.setFromCamera(mousePosition, this.camera)
		return this.raycaster.intersectObjects(visibleJawParts)[0]?.point
	}

	addMarker(edgeId: PkmEdgeType, position: SerializableVector3) {
		if (!this.scene) return

		const marker = getMarker(position, edgeId)
		this.scene.add(marker)
	}

	addEdge(edge: PkmEdge) {
		const line = getEdge(edge)
		if (line) this.scene?.add(line)
	}

	removeEdge(edgeId: PkmEdgeType) {
		const foundObjects = this.scene?.children.filter((m) => m.userData['edgeId'] === edgeId)
		foundObjects?.forEach((m) => this.scene?.remove(m))
	}

	private redrawExistingData(analysis: PkmAnalysis) {
		analysis.edges.forEach((edge) => {
			if (edge.mark1) this.addMarker(edge.id, edge.mark1)
			if (edge.mark2) this.addMarker(edge.id, edge.mark2)
			if (edge.mark1 && edge.mark2) this.addEdge(edge)
		})
	}

	private initScene(canvas: HTMLCanvasElement) {
		const { offsetWidth, offsetHeight } = canvas

		this.canvas = canvas
		this.camera = initCamera(offsetWidth, offsetHeight)
		this.orbitControls = initOrbitControls(canvas, this.camera)

		this.scene = new Scene()
		this.scene.background = new Color('#ffffff')
		this.scene.add(this.camera)

		if (this.lowerJaw && this.upperJaw) {
			this.scene.add(this.lowerJaw)
			this.scene.add(this.upperJaw)
		}
		const light = initLight()
		this.scene.add(light)
	}

	private initRenderer() {
		if (!this.canvas || !this.scene || !this.camera) return

		const { offsetWidth, offsetHeight } = this.canvas
		const smoothOutEdges = true

		this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: smoothOutEdges })
		this.renderer.setSize(offsetWidth, offsetHeight)
		this.renderer.setPixelRatio(devicePixelRatio)
		this.renderer.render(this.scene, this.camera)
	}

	private initModel(geometry: BufferGeometry) {
		// TODO: enable merging of partial stl file upload
		this.upperJaw = new Mesh(geometry.clone(), this.jawMaterial)
		this.lowerJaw = new Mesh(geometry.clone(), this.jawMaterial)

		if (geometry?.groups?.length !== 2) return

		const [lowerJaw, upperJaw] = geometry.groups
		this.lowerJaw.geometry.setDrawRange(lowerJaw.start, lowerJaw.count)
		this.upperJaw.geometry.setDrawRange(upperJaw.start, upperJaw.count)
	}
}
