import { Injectable } from '@angular/core'
import { BaseRenderingService } from '@dentalyzer/common'
import { first, tap } from 'rxjs'
import { Object3D } from 'three'
import { initCamera, initOrbitControls } from './camera.utils'
import { loadPkmFromFile } from './loader.utils'
import { initRenderer } from './renderer.utils'
import { initScene } from './scene.utils'

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
					this.initAnimation(canvas, pkm)
					this.startAnimation()
				})
			)
			.subscribe()
	}

	private initAnimation(canvas: HTMLCanvasElement, pkm: Object3D): void {
		const { offsetWidth, offsetHeight } = canvas

		this.canvas = canvas
		this.camera = initCamera(offsetWidth, offsetHeight)
		this.orbitControls = initOrbitControls(canvas, this.camera)
		this.scene = initScene(this.camera)
		this.scene.add(pkm)
		this.renderer = initRenderer(canvas, this.scene, this.camera)
	}
}
