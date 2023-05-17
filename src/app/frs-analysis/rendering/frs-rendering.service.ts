import { Injectable } from '@angular/core'
import { Observable, from, map } from 'rxjs'
import { BaseRenderingService } from 'src/app/common/base/base.rendering.service'
import {
	Box3,
	Color,
	MOUSE,
	PerspectiveCamera,
	Scene,
	Sprite,
	SpriteMaterial,
	Texture,
	TextureLoader,
	Vector3,
	WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeData } from './three-data.model'

@Injectable({
	providedIn: 'root',
})
export class FrsRenderingService extends BaseRenderingService {
	private sprite?: Sprite
	constructor() {
		super()
	}

	initImageRendering(canvas: HTMLCanvasElement, imageBase64: string): Observable<ThreeData> {
		return from(new TextureLoader().loadAsync(imageBase64)).pipe(
			map((frsTexture) => {
				this.canvas = canvas

				this.initSprite(frsTexture)
				this.initScene()
				this.initCamera()
				this.initRenderer()
				this.initOrbitControls()

				this.startAnimation()

				return {
					renderer: this.renderer,
					scene: this.scene,
					camera: this.camera,
					orbitControls: this.orbitControls,
					sprite: this.sprite,
				} as ThreeData
			})
		)
	}

	initSprite(frsTexture: Texture) {
		const {
			image: { width, height },
		} = frsTexture
		const material = new SpriteMaterial({ map: frsTexture })
		const sprite = new Sprite(material)
		sprite.scale.set(1, (1 * height) / width, 0)
		sprite.position.set(0, 0, 0)

		this.sprite = sprite
	}

	initScene() {
		const scene = new Scene()
		scene.background = new Color('#ffffff')

		if (this.sprite) {
			scene.add(this.sprite)
		}

		this.scene = scene
	}

	initCamera() {
		if (!this.canvas || !this.sprite) {
			return
		}
		const { offsetWidth, offsetHeight } = this.canvas
		const camera = new PerspectiveCamera(45, offsetWidth / offsetHeight, 0.1, 1000)
		camera.updateProjectionMatrix()

		const boundingBox = new Box3().setFromObject(this.sprite)
		const size = new Vector3()
		boundingBox.getSize(size)
		const z = (0.5 * (size.y * 1.5)) / Math.tan((22.5 * Math.PI) / 180)
		camera.position.set(0, 0, z)

		this.camera
	}

	initOrbitControls() {
		if (!this.camera || !this.renderer) {
			return
		}

		const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
		orbitControls.mouseButtons.RIGHT = MOUSE.PAN
		orbitControls.mouseButtons.LEFT = MOUSE.PAN
		orbitControls.enableRotate = false
		orbitControls.maxDistance = this.camera.position.distanceTo(orbitControls.target)
		orbitControls.minDistance = 0.15

		orbitControls.update()

		this.orbitControls = orbitControls
	}

	initRenderer() {
		if (!this.canvas || !this.camera || !this.scene) {
			return
		}
		const { offsetWidth, offsetHeight } = this.canvas
		const renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(offsetWidth, offsetHeight)
		renderer.render(this.scene, this.camera)

		this.renderer = renderer
	}
}
