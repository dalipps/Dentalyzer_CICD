import { Vector3 } from 'three'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'
import { getNormalIntersection } from './calculation.utils'
import { FrsDistanceCalculation } from './frs-calculation.model'

export function checkDistance(
	calculationData: FrsDistanceCalculation,
	edges: FrsEdge[],
	marks: FrsMark[],
	mark?: FrsMark,
	initialValue?: number
): number | undefined {
	if (!mark || mark.edgeTypes.includes(calculationData.edge) || mark.id === calculationData.point) {
		const edge = edges.find((e) => e.id === calculationData.edge)
		const point = marks.find((m) => m.id === calculationData.point)
		if (edge && point) {
			return calculateDistance(edge, point, marks)
		}
	}

	return initialValue
}

function calculateDistance(edge: FrsEdge, point: FrsMark, marks: FrsMark[]): number | undefined {
	const mark1 = marks.find((m) => m.id === edge.markType1)
	const mark2 = marks.find((m) => m.id === edge.markType2)
	if (!mark1?.position || !mark2?.position || !point.position) return

	const v1 = new Vector3(mark1.position.x, mark1.position.y, mark1.position.z)
	const v2 = new Vector3(mark2?.position.x, mark2?.position.y, mark2?.position.z)
	const p = new Vector3(point.position.x, point.position.y, point.position.z)

	return getNormalIntersection(v1, v2, p).distanceTo(p)
}
