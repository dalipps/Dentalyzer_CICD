import { cloneDeep } from 'lodash-es'
import { Line3, Vector3 } from 'three'
import { FrsMark, FrsMarkType, getVectorFromPosition } from '../mark'
import { FrsAnalysis } from '../store'
import { checkAngleCalculation } from './angle-calculation.utils'
import { checkAngleMultiplicationTarget } from './angle-multiplication-calculation.utils'
import { checkAngleSum } from './angle-sum-calculation.utils'
import { checkDistance } from './distance-calculation.utils'
import { FrsCalculationDataType as DataType } from './frs-calculation-data-type.enum'
import { FrsCalculationType } from './frs-calculation-type.enum'
import { FrsAngleMultiplicationCalculation } from './frs-calculation.model'
import { checkIntersectionDistance } from './intersection-distance-calculation.utils'
import { checkQuotient } from './quotient-calculation.utils'

export function recalculate(analysis: FrsAnalysis, changedMarkId?: FrsMarkType): FrsAnalysis {
	const clonedAnalysis = cloneDeep(analysis)
	const { marks, edges, calculations } = clonedAnalysis
	const changedMark = changedMarkId ? marks.find((m) => m.id === changedMarkId) : undefined

	const recalculatedTypes: FrsCalculationType[] = []
	const independendTypes = [DataType.Angle, DataType.IntersectionDistance, DataType.Distance, DataType.Quotient]
	const independendCalculations = calculations?.filter((c) => independendTypes.includes(c.data.id))
	// Calculate AngleSum before AngleMultiplications
	const dependendCalculations = calculations
		?.filter((c) => !independendTypes.includes(c.data.id))
		.sort((a) => (a.data.id === DataType.AngleMultiplication ? 1 : -1))

	independendCalculations?.forEach((calculation) => {
		let value: number | undefined
		switch (calculation.data.id) {
			case DataType.Angle:
				value = checkAngleCalculation(calculation.data, edges, changedMark, calculation.value)
				break
			case DataType.IntersectionDistance:
				value = checkIntersectionDistance(calculation.data, edges, marks, changedMark, calculation.value)
				break
			case DataType.Distance:
				value = checkDistance(calculation.data, edges, marks, changedMark, calculation.value)
				break
			case DataType.Quotient:
				value = checkQuotient(calculation.data, marks, changedMark, analysis.mmPerPixel, calculation.value)
				break
		}

		if (value !== calculation.value) recalculatedTypes.push(calculation.id)
		calculation.value = value !== undefined ? Math.round(value * 100) / 100 : undefined
	})

	dependendCalculations?.forEach((calculation) => {
		let value: number | undefined
		let targetValue: number | undefined
		switch (calculation.data.id) {
			case DataType.AngleSum:
				value = checkAngleSum(calculation.data, recalculatedTypes, calculations, calculation.value)
				targetValue = calculation.targetValueMaleOrAll
				break
			case DataType.AngleMultiplication:
				targetValue = checkAngleMultiplicationTarget(calculation.data, recalculatedTypes, calculations)
				value = calculations.find(
					(c) => c.id === (calculation.data as FrsAngleMultiplicationCalculation).valueDuplicateId
				)?.value
				break
		}

		if (value !== calculation.value) recalculatedTypes.push(calculation.id)

		calculation.value = value ? Math.round(value * 100) / 100 : undefined
		calculation.targetValueMaleOrAll = targetValue ? Math.round(targetValue * 100) / 100 : undefined
	})

	return clonedAnalysis
}

export function getHalfCutting(mark1: FrsMark, mark2: FrsMark): Vector3 | undefined {
	const v1 = getVectorFromPosition(mark1.position)
	const v2 = getVectorFromPosition(mark2.position)
	if (!v1 || !v2) return

	return new Vector3().subVectors(v2, v1).multiplyScalar(0.5).add(v1)
}

// Inspired by https://jsfiddle.net/justin_c_rounds/Gd2S2/light/
export function getIntersectionBetweenEdges(
	edge1mark1: FrsMark,
	edge1mark2: FrsMark,
	edge2mark1: FrsMark,
	edge2mark2: FrsMark
): Vector3 | undefined {
	const edge1point1 = getVectorFromPosition(edge1mark1.position)
	const edge1point2 = getVectorFromPosition(edge1mark2.position)
	const edge2point1 = getVectorFromPosition(edge2mark1.position)
	const edge2point2 = getVectorFromPosition(edge2mark2.position)

	if (!edge1point1 || !edge1point2 || !edge2point1 || !edge2point2) return
	return getIntersectionOfEdgePoints(edge1point1, edge1point2, edge2point1, edge2point2)
}

export function getIntersectionOfEdgePoints(
	edge1point1: Vector3,
	edge1point2: Vector3,
	edge2point1: Vector3,
	edge2point2: Vector3
): Vector3 | undefined {
	const line1StartX = edge1point1.x
	const line1StartY = edge1point1.y
	const line1EndX = edge1point2.x
	const line1EndY = edge1point2.y
	const line2StartX = edge2point1.x
	const line2StartY = edge2point1.y
	const line2EndX = edge2point2.x
	const line2EndY = edge2point2.y

	const denominator =
		(line2EndY - line2StartY) * (line1EndX - line1StartX) - (line2EndX - line2StartX) * (line1EndY - line1StartY)
	if (denominator == 0) {
		return
	}
	const startHelperY = line1StartY - line2StartY
	const startHelperX = line1StartX - line2StartX
	const numerator1 = (line2EndX - line2StartX) * startHelperY - (line2EndY - line2StartY) * startHelperX
	const quotient = numerator1 / denominator

	const result = new Vector3()

	result.x = line1StartX + quotient * (line1EndX - line1StartX)
	result.y = line1StartY + quotient * (line1EndY - line1StartY)
	result.z = 0

	return result
}

export function getNormalIntersection(v1: Vector3, v2: Vector3, p: Vector3): Vector3 {
	const normal = new Vector3()
		.subVectors(v1, v2)
		.applyAxisAngle(new Vector3(0, 0, 1), Math.PI * 0.5)
		.normalize()

	const normalVertices = [normal.clone().setLength(2).add(p), normal.clone().negate().setLength(2).add(p)]

	const line1 = new Line3(v1, v2)
	const line2 = new Line3(normalVertices[0], normalVertices[1])

	const pointOnLine1 = new Vector3()
	const pointOnLine2 = new Vector3()

	line1.closestPointToPoint(line2.start, false, pointOnLine1)
	line2.closestPointToPoint(line1.start, false, pointOnLine2)

	return new Vector3().addVectors(pointOnLine1, pointOnLine2).multiplyScalar(0.5)
}

export function calculateDirection(mark1?: FrsMark, mark2?: FrsMark): Vector3 | undefined {
	if (!mark1?.position || !mark2?.position) return

	return new Vector3(
		mark2.position.x - mark1.position.x,
		mark2.position.y - mark1.position.y,
		mark2.position.z - mark1.position.z
	)
}
