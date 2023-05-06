import * as THREE from 'three'

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
