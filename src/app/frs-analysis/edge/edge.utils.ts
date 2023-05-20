import { cloneDeep } from 'lodash-es'
import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three'
import { FrsMark, FrsPosition } from '../mark'
import { ObjectType } from '../rendering/marker.model'
import { FrsAnalysis } from '../store'
import { FrsEdgeType } from './frs-edge-type.enum'
import { FrsEdge, FrsEdgePositionMap } from './frs-edge.model'

export function getEdge(edge: FrsEdge, mark1: FrsMark, mark2: FrsMark) {
	const markPositions = [mark1, mark2]
		.filter((m) => m.id === edge.markType1 || m.id === edge.markType2)
		.map((m) => m.position)
		.filter((p): p is FrsPosition => !!p)
		.map((p) => new Vector3(p.x, p.y, p.z + 0.5))

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
	line.userData = { edgeId: edge.id, objectType: ObjectType.Edge }

	return line
}

export function setDirectionOfEdges(analysis: FrsAnalysis, edgeMapping: FrsEdgePositionMap[]): FrsAnalysis {
	const clonedAnalysis = cloneDeep(analysis)

	edgeMapping.forEach((mapping) => {
		const edge = clonedAnalysis.edges.find((e) => e.id === mapping.edgeId)
		if (edge) {
			edge.direction = mapping.direction
			edge.isVisible = true
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
