import { Injectable } from '@angular/core'
import { debounceTime, fromEvent, takeUntil, tap } from 'rxjs'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BaseService } from './base.service'

@Injectable({
	providedIn: 'root',
})
export abstract class BaseRenderingService extends BaseService {
	protected scene?: Scene
	protected camera?: PerspectiveCamera
	protected renderer?: WebGLRenderer
	protected orbitControls?: OrbitControls
	protected canvas?: HTMLCanvasElement

	private animationFrameId?: number

	constructor() {
		super()

		this.onWindowResize().pipe(takeUntil(this.destroy$)).subscribe()
	}

	startAnimation() {
		const animate = () => {
			this.animationFrameId = requestAnimationFrame(animate)
			if (this.renderer && this.scene && this.orbitControls && this.camera) {
				this.orbitControls.update()
				this.renderer.render(this.scene, this.camera)
			}
		}

		animate()
	}

	stopAnimation() {
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId)
		}
	}

	private onWindowResize() {
		return fromEvent(window, 'resize').pipe(
			debounceTime(20),
			tap(() => {
				if (this.camera && this.renderer && this.canvas) {
					const { offsetWidth, offsetHeight } = this.canvas

					this.renderer.setSize(offsetWidth, offsetHeight)
					this.camera.aspect = offsetWidth / offsetHeight
					this.camera.updateProjectionMatrix()
				}
			})
		)
	}

	override ngOnDestroy() {
		super.ngOnDestroy()
		this.stopAnimation()
	}
}
