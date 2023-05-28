import { Injectable } from '@angular/core'
import { BaseRenderingService } from '@dentalyzer/common'
import { first, tap } from 'rxjs'
import { Color, Object3D, Scene, WebGLRenderer } from 'three'
import { initLight, loadPkmFromFile } from './pkm.utils'
import { initCamera, initOrbitControls } from './scene.utils'

@Injectable({
	providedIn: 'root',
})
export class PkmRenderingService extends BaseRenderingService {
	constructor() {
		super()
	}

	render(canvas: HTMLCanvasElement, file: File): void {
		loadPkmFromFile(file)
			.pipe(
				first(),
				tap((pkm) => {
					this.initScene(canvas, pkm)
					this.initRenderer()
					this.startAnimation()
				})
			)
			.subscribe()
	}

	private initScene(canvas: HTMLCanvasElement, pkm: Object3D) {
		const { offsetWidth, offsetHeight } = canvas

		this.canvas = canvas
		this.camera = initCamera(offsetWidth, offsetHeight)
		this.orbitControls = initOrbitControls(canvas, this.camera)

		this.scene = new Scene()
		this.scene.background = new Color('#ffffff')
		this.scene.add(this.camera)

		const light = initLight()
		this.scene.add(pkm)
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
}
