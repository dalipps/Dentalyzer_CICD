import { Vector3 } from 'three'
import { FrsEdge } from '../edge'
import { FrsMark, getVectorFromPosition } from '../mark'
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
			const vector1 = getVectorFromPosition(edge1.direction)
			const vector2 = getVectorFromPosition(edge2.direction)
			return calculateAngle(vector1, vector2, calculationData.isLeft)
		}
	}

	return initialValue
}

export function calculateAngle(direction1?: Vector3, direction2?: Vector3, isLeft = false): number | undefined {
	if (direction1 && direction2) {
		if (isLeft) {
			return (direction1.angleTo(direction2) * 180) / Math.PI
		} else {
			return 180 - (direction1.angleTo(direction2) * 180) / Math.PI
		}
	}

	return undefined
}
