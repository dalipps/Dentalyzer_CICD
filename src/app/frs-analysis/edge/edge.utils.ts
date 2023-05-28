import { cloneDeep } from 'lodash-es'
import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three'
import { calculateDirection } from '../calculation'
import { FrsMark } from '../mark'
import { ObjectType } from '../rendering'
import { FrsAnalysis } from '../store'
import { FrsEdgeType } from './frs-edge-type.enum'
import { FrsEdge, FrsEdgePositionMap } from './frs-edge.model'

export const EDGE_Z_RAISE = 0.001

export function getEdge(edge: FrsEdge, mark1: FrsMark, mark2: FrsMark) {
	const markPositions = [mark1, mark2]
		.map((m) => {
			if ((m.id === edge.markType1 || m.id === edge.markType2) && m.position) {
				return new Vector3(m.position.x, m.position.y, m.position.z + EDGE_Z_RAISE)
			}
			return
		})
		.filter((v): v is Vector3 => !!v)

	if (markPositions.length !== 2) return

	const geometry = new BufferGeometry().setFromPoints(markPositions)
	const material = new LineBasicMaterial({
		color: '#003252',
		transparent: true,
		depthTest: true,
		depthWrite: false,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		linejoin: 'round',
		linewidth: 2,
	})
	const line = new Line(geometry, material)
	line.name = 'Edge ' + edge.id
	line.traverse((o) => (o.frustumCulled = false))
	line.userData = { edgeId: edge.id, objectType: ObjectType.Edge }

	return line
}

export function setDirectionsOfEdges(analysis: FrsAnalysis, edgeMapping: FrsEdgePositionMap[]): FrsAnalysis {
	const clonedAnalysis = cloneDeep(analysis)

	edgeMapping.forEach((mapping) => {
		const edge = clonedAnalysis.edges.find((e) => e.id === mapping.edgeId)
		if (edge) {
			edge.isVisible = !edge.direction ? true : edge.isVisible
			edge.direction = mapping.direction
		}
	})

	return clonedAnalysis
}

export function setEdgeVisibility(analysis: FrsAnalysis, edgeId: FrsEdgeType, isVisible: boolean): FrsAnalysis {
	const clonedAnalysis = cloneDeep(analysis)
	const edge = clonedAnalysis.edges.find((e) => e.id === edgeId)

	if (edge) edge.isVisible = isVisible

	return clonedAnalysis
}

export function checkChangedEges(edges: FrsEdge[], allMarks: FrsMark[]): FrsEdgePositionMap[] {
	const allSetMarkers = allMarks.filter((m) => m.position)
	const changedEdges: FrsEdgePositionMap[] = []

	edges.forEach((e) => {
		const mark1 = allSetMarkers.find((m) => m.id === e.markType1 && m.position)
		const mark2 = allSetMarkers.find((m) => m.id === e.markType2 && m.position)
		const direction = calculateDirection(mark1, mark2)
		if (direction !== e.direction) changedEdges.push({ edgeId: e.id, direction })
	})

	return changedEdges
}
