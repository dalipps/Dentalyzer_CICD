import { Observable, from, fromEvent, map, switchMap } from 'rxjs'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeData } from '../models'

export function initImageRendering(canvas: HTMLCanvasElement, file: File): Observable<ThreeData> {
	const reader = new FileReader()
	reader.readAsDataURL(file)

	return fromEvent(reader, 'loadend').pipe(
		switchMap(() => from(new THREE.TextureLoader().loadAsync(reader.result as string))),
		map((texture) => {
			const scene = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
			const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

			scene.background = new THREE.Color('#ffffff')

			renderer.setPixelRatio(window.devicePixelRatio)
			renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

			camera.aspect = canvas.offsetWidth / canvas.offsetHeight
			camera.updateProjectionMatrix()

			const material = new THREE.SpriteMaterial({ map: texture })

			const sprite = new THREE.Sprite(material)
			sprite.scale.set(1, (1 * texture.image.height) / texture.image.width, 0)
			sprite.position.set(0, 0, 0)

			const boundingBox = new THREE.Box3().setFromObject(sprite)
			const size = new THREE.Vector3()

			boundingBox.getSize(size)

			const z = (0.5 * (size.y * 1.5)) / Math.tan((22.5 * Math.PI) / 180)
			camera.position.set(0, 0, z)

			scene.add(sprite)

			renderer.render(scene, camera)

			const orbitControls = initOrbitControls(camera, renderer)

			return { renderer, scene, camera, orbitControls, sprite }
		})
	)
}

function initOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer): OrbitControls {
	const orbitControls = new OrbitControls(camera, renderer.domElement)

	orbitControls.mouseButtons.RIGHT = THREE.MOUSE.PAN
	orbitControls.mouseButtons.LEFT = THREE.MOUSE.PAN
	orbitControls.enableRotate = false

	const distance = camera.position.distanceTo(orbitControls.target)
	orbitControls.maxDistance = distance
	orbitControls.minDistance = 0.15

	orbitControls.update()

	return orbitControls
}
