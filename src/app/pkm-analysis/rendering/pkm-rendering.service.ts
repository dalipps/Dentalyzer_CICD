import { Injectable } from '@angular/core'
import { BaseRenderingService } from '@dentalyzer/common'
import { first, tap } from 'rxjs'
import { BufferGeometry, Color, Mesh, MeshPhongMaterial, Scene, WebGLRenderer } from 'three'
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

	render(canvas: HTMLCanvasElement, file: File): void {
		parseStlToGeometry(file)
			.pipe(
				first(),
				tap((geometry) => {
					this.initModel(geometry)
					this.initScene(canvas)
					this.initRenderer()
					this.startAnimation()
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
