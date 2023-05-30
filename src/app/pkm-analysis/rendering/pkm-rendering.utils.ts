import { SerializableVector3 } from '@dentalyzer/common'
import * as THREE from 'three'
import { PkmEdge, PkmEdgeType } from '../edge/pkm-edge'

export function getMarker(position: SerializableVector3, edgeId: PkmEdgeType): THREE.Object3D {
	const positionVector = new THREE.Vector3(position.x, position.y, position.z)
	const geometry = new THREE.IcosahedronGeometry(0.4, 5)
	const material = new THREE.MeshPhongMaterial({ color: 0xf3c456 })
	const mesh = new THREE.Mesh(geometry, material)
	mesh.userData = { edgeId }
	mesh.position.add(positionVector)
	return mesh
}

// TODO: make shared
export function getEdge(edge: PkmEdge) {
	if (!edge.mark1 || !edge.mark2) return

	const markPositions = [edge.mark1, edge.mark2].map((e) => new THREE.Vector3(e.x, e.y, e.z))

	const geometry = new THREE.BufferGeometry().setFromPoints(markPositions)
	const material = new THREE.LineBasicMaterial({
		color: '#003252',
		polygonOffset: true,
		polygonOffsetFactor: -4,
		linejoin: 'round',
		linewidth: 2,
	})

	const line = new THREE.Line(geometry, material)
	line.name = 'Edge ' + edge.id
	line.traverse((o) => (o.frustumCulled = false))
	line.userData = { edgeId: edge.id }

	return line
}
