import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface ThreeData {
	renderer: THREE.WebGLRenderer
	scene: THREE.Scene
	sprite: THREE.Sprite
	camera: THREE.PerspectiveCamera
	orbitControls: OrbitControls
}
