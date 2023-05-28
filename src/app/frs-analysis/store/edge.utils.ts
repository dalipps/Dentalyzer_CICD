import { Vector3 } from 'three'
import { FrsEdge, FrsEdgePositionMap } from '../edge'
import { FrsMark } from '../mark'

export function recalculateEdges(edges: FrsEdge[], allMarks: FrsMark[]): FrsEdgePositionMap[] {
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

export function calculateDirection(mark1?: FrsMark, mark2?: FrsMark): Vector3 | undefined {
	if (!mark1?.position || !mark2?.position) return

	return new Vector3(
		mark2.position.x - mark1.position.x,
		mark2.position.y - mark1.position.y,
		mark2.position.z - mark1.position.z
	)
}
