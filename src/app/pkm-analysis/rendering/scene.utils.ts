import { Camera, Color, Scene } from 'three'

export function initScene(camera: Camera): Scene {
	const sceneBackground = '#ffffff'

	const scene = new Scene()
	scene.background = new Color(sceneBackground)
	scene.add(camera)

	return scene
}
