import { Camera, Scene, WebGLRenderer } from 'three'

export function initRenderer(canvas: HTMLCanvasElement, scene: Scene, camera: Camera): WebGLRenderer {
	const { offsetWidth, offsetHeight } = canvas
	const smoothOutEdges = true

	const renderer = new WebGLRenderer({ canvas, antialias: smoothOutEdges })
	renderer.setSize(offsetWidth, offsetHeight)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.render(scene, camera)

	return renderer
}
