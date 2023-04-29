import * as THREE from 'three'

export function getFirstIntersection(
	v2: THREE.Vector2,
	object: THREE.Object3D,
	raycaster: THREE.Raycaster,
	camera: THREE.Camera
): THREE.Vector3 {
	raycaster.setFromCamera(v2, camera)
	const intersects = raycaster.intersectObject(object)

	// TODO: wird das benötigt
	// intersects[0].point.z = 0;

	return intersects[0]?.point
}

export function getNormalizedMousePosition(canvas: HTMLCanvasElement, x: number, y: number): THREE.Vector2 {
	const mouseVector = new THREE.Vector2()

	// TODO: wird das benötigt
	// const canvasPosition = canvas.getBoundingClientRect();
	// mouseVector.x = ((x - canvasPosition.left) / canvasPosition.width) * 2 - 1;
	// mouseVector.y = -((y - canvasPosition.top) / canvasPosition.height) * 2 + 1;

	mouseVector.x = (x / canvas.offsetWidth) * 2 - 1
	mouseVector.y = -(y / canvas.offsetHeight) * 2 + 1

	return mouseVector
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function getSelectedMark(
	_mousePosition: THREE.Vector2,
	_raycaster: THREE.Raycaster,
	_camera: THREE.Camera,
	_scene: THREE.Scene
): THREE.Object3D | undefined {
	// TODO: implement
	return
}
