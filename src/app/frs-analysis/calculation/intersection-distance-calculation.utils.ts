import { Vector3 } from 'three'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'
import { getNormalIntersection } from './calculation.utils'
import { FrsIntersectionDistanceCalculation } from './frs-calculation.model'

export function checkIntersectionDistance(
	calculationData: FrsIntersectionDistanceCalculation,
	edges: FrsEdge[],
	marks: FrsMark[],
	mark?: FrsMark,
	initialValue?: number
): number | undefined {
	if (
		!mark ||
		mark.edgeTypes.includes(calculationData.edge) ||
		mark.id === calculationData.point1 ||
		mark.id === calculationData.point2
	) {
		const edge = edges.find((e) => e.id === calculationData.edge)
		const point1 = marks.find((m) => m.id === calculationData.point1)
		const point2 = marks.find((m) => m.id === calculationData.point2)
		if (edge && point1 && point2) {
			return calculateIntersectionDistance(edge, point1, point2, marks)
		}
	}

	return initialValue
}

function calculateIntersectionDistance(
	edge: FrsEdge,
	point1: FrsMark,
	point2: FrsMark,
	marks: FrsMark[]
): number | undefined {
	const mark1 = marks.find((m) => m.id === edge.markType1)
	const mark2 = marks.find((m) => m.id === edge.markType2)
	if (!mark1?.position || !mark2?.position || !point1.position || !point2.position) return

	const v1 = new Vector3(mark1.position.x, mark1.position.y, mark1.position.z)
	const v2 = new Vector3(mark2?.position.x, mark2?.position.y, mark2?.position.z)
	const p1 = new Vector3(point1.position.x, point1.position.y, point1.position.z)
	const p2 = new Vector3(point2.position.x, point2.position.y, point2.position.z)
	const intersection1 = getNormalIntersection(v1, v2, p1)
	const intersection2 = getNormalIntersection(v1, v2, p2)

	return intersection1.distanceTo(intersection2)
}
