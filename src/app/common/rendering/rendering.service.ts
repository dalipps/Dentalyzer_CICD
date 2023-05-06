import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, debounceTime, fromEvent, takeUntil, tap } from 'rxjs'
import { BaseService } from '../base'
import { initImageRendering } from './rendering.utils'
import { ThreeData } from './three-data.model'

@Injectable({
	providedIn: 'root',
})
export class RenderingService extends BaseService {
	private threeDataSubject$ = new BehaviorSubject<ThreeData | undefined>(undefined)
	private animationFrame: number | undefined
	private canvas: HTMLCanvasElement | undefined

	constructor() {
		super()

		fromEvent(window, 'resize')
			.pipe(
				takeUntil(this.destroy$),
				debounceTime(20),
				tap(() => {
					const data = this.threeDataSubject$.value
					if (!data || !this.canvas) return

					data.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)

					data.camera.aspect = this.canvas.offsetWidth / this.canvas.offsetHeight
					data.camera.updateProjectionMatrix()
				})
			)
			.subscribe()
	}

	initImageRendering(canvas: HTMLCanvasElement, file: File): Observable<ThreeData> {
		return initImageRendering(canvas, file).pipe(
			tap((data) => {
				this.canvas = canvas
				this.threeDataSubject$.next(data)
				this.startAnimation()
			})
		)
	}

	startAnimation(): void {
		const data = this.threeDataSubject$.value
		if (!data) return

		const animate = () => {
			this.animationFrame = requestAnimationFrame(animate)

			data.orbitControls.update()
			data.renderer.render(data.scene, data.camera)
		}

		animate()
	}

	cancelAnimation(): void {
		if (this.animationFrame === undefined) return

		cancelAnimationFrame(this.animationFrame)
	}
}
