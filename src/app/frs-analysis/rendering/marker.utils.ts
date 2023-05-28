import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import { FrsMarkType, FrsPosition } from '../mark'
import { ObjectType } from '../rendering/marker.model'

export const LABEL_Z_RAISE = 0.005
export const LABEL_Y_RAISE = -3

export function getMarker(markId: FrsMarkType, position: FrsPosition, isGenerated?: boolean): THREE.Mesh {
	const geometry = new THREE.CircleGeometry(0.5)
	const material = new THREE.MeshBasicMaterial({
		color: isGenerated ? '#81acc2' : '#f3c456',
		transparent: true,
	})
	const marker = new THREE.Mesh(geometry, material)
	marker.traverse((o) => (o.frustumCulled = false))
	marker.userData = { markId, objectType: ObjectType.Marker }
	marker.name = 'Marker ' + markId
	marker.scale.set(0.6, 0.6, 0.6)
	marker.position.set(position.x, position.y, position.z)

	return marker
}

export function getLabel(
	text: string,
	markId: FrsMarkType,
	markerPosition: FrsPosition,
	isVisible?: boolean
): THREE.Object3D | undefined {
	const label = new SpriteText(text, 1)
	label.fontSize = 90
	label.fontWeight = '600'
	label.color = 'black'
	label.backgroundColor = 'white'
	label.borderColor = '#004a6f'
	label.borderWidth = 0.5
	label.borderRadius = 3
	label.padding = 3
	label.position.x = markerPosition.x
	label.position.y = markerPosition.y + LABEL_Y_RAISE
	label.position.z = markerPosition.z + LABEL_Z_RAISE
	label.traverse((o) => (o.frustumCulled = false))
	label.userData = { markId, objectType: ObjectType.Label, markerPosition }
	label.name = 'Label ' + markId

	label.scale.set(text.length * 1.4 + 1.4, 4, 1)

	label.visible = !!isVisible

	return label
}

export function getMeshCenter(mesh: THREE.Mesh): THREE.Vector3 {
	mesh.geometry.computeBoundingBox()
	const center = new THREE.Vector3()
	mesh.geometry.boundingBox?.getCenter(center)
	return mesh.localToWorld(center)
}
