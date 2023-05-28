import { Vector3 } from 'three'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'
import { FrsAngleCalculation } from './frs-calculation.model'

export function checkAngleCalculation(
	calculationData: FrsAngleCalculation,
	edges: FrsEdge[],
	mark?: FrsMark,
	initialValue?: number
): number | undefined {
	if (!mark || mark.edgeTypes.includes(calculationData.edge1) || mark.edgeTypes.includes(calculationData.edge2)) {
		const edge1 = edges.find((e) => e.id === calculationData.edge1)
		const edge2 = edges.find((e) => e.id === calculationData.edge2)
		if (edge1 && edge2) {
			return calculateAngle(edge1, edge2, calculationData.isLeft)
		}
	}

	return initialValue
}

function calculateAngle(edge1: FrsEdge, edge2: FrsEdge, isLeft: boolean): number | undefined {
	const direction1 = edge1.direction
	const direction2 = edge2.direction
	if (direction1 && direction2) {
		const test1 = new Vector3(direction1.x, direction1.y, direction1.z)
		const test2 = new Vector3(direction2.x, direction2.y, direction2.z)

		if (isLeft) {
			return (test1.angleTo(test2) * 180) / Math.PI
		} else {
			return 180 - (test1.angleTo(test2) * 180) / Math.PI
		}
	}

	return undefined
}
