import { Camera, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function initCamera(canvasWidth: number, canvasHeight: number): PerspectiveCamera {
	const frustumVerticalFieldOfView = 45
	const nearPlan = 0.1
	const farPlane = 1000
	const frustumAspectRatio = canvasWidth / canvasHeight
	const position = { x: 113, y: 111, z: 113 }

	const camera = new PerspectiveCamera(frustumVerticalFieldOfView, frustumAspectRatio, nearPlan, farPlane)
	camera.position.set(position.x, position.y, position.z)
	camera.updateProjectionMatrix()

	return camera
}

export function initOrbitControls(canvas: HTMLCanvasElement, camera: Camera): OrbitControls {
	const minZoom = 1
	const maxZoom = 3000

	const orbitControls = new OrbitControls(camera, canvas)
	orbitControls.minDistance = minZoom
	orbitControls.maxDistance = maxZoom

	return orbitControls
}
