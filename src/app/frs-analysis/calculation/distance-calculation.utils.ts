import { Line3, Vector3 } from 'three'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'
import { getIntersectionOfEdgePoints, getNormalIntersection } from './calculation.utils'
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
			return calculateDistance(edge, point, marks, calculationData.considerSign)
		}
	}

	return initialValue
}

function calculateDistance(
	edge: FrsEdge,
	point: FrsMark,
	marks: FrsMark[],
	considerSign?: boolean
): number | undefined {
	const mark1 = marks.find((m) => m.id === edge.markType1)
	const mark2 = marks.find((m) => m.id === edge.markType2)
	if (!mark1?.position || !mark2?.position || !point.position) return

	const v1 = new Vector3(mark1.position.x, mark1.position.y, mark1.position.z)
	const v2 = new Vector3(mark2?.position.x, mark2?.position.y, mark2?.position.z)
	const p = new Vector3(point.position.x, point.position.y, point.position.z)

	let distance = getNormalIntersection(v1, v2, p).distanceTo(p)

	if (considerSign) {
		const zDirection = new Vector3(1, 0, 0)
		const helperVector = new Vector3().copy(p).add(zDirection)
		const intersection = getIntersectionOfEdgePoints(v1, v2, p, helperVector)

		if (intersection) {
			const helperLine = new Line3(p, helperVector)
			const closestPoint = new Vector3()
			helperLine.closestPointToPoint(intersection, false, closestPoint)

			if (closestPoint.x > p.x) {
				distance = distance * -1
			}
		}
	}

	return distance
}
