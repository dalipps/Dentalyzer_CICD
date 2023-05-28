import { cloneDeep } from 'lodash-es'
import { Line3, Vector3 } from 'three'
import { FrsEdge } from '../edge'
import { FrsMark, FrsMarkType } from '../mark'
import { FrsAnalysis } from '../store'
import { FrsCalculationDataType as DataType } from './frs-calculation-data-type.enum'
import { FrsCalculationType } from './frs-calculation-type.enum'
import {
	FrsAngleCalculation,
	FrsAngleMultiplicationCalculation,
	FrsAngleSumCalculation,
	FrsCalculation,
	FrsDistanceCalculation,
	FrsIntersectionDistanceCalculation,
	FrsQuotientCalculation,
} from './frs-calculation.model'

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

export function checkQuotient(
	calculationData: FrsQuotientCalculation,
	marks: FrsMark[],
	mark?: FrsMark,
	mmPerPixel?: number,
	initialValue?: number
): number | undefined {
	// TODO: David show message toast
	if (!mmPerPixel) return

	if (
		!mark ||
		[
			calculationData.line1point1,
			calculationData.line1point2,
			calculationData.line2point1,
			calculationData.line2point2,
		].includes(mark.id)
	) {
		const line1point1 = marks.find((m) => m.id === calculationData.line1point1)
		const line1point2 = marks.find((m) => m.id === calculationData.line1point2)
		const line2point1 = marks.find((m) => m.id === calculationData.line2point1)
		const line2point2 = marks.find((m) => m.id === calculationData.line2point2)

		if (line1point1 && line1point2 && line2point1 && line2point2) {
			return calculateQuotient(line1point1, line1point2, line2point1, line2point2, mmPerPixel)
		}
	}

	return initialValue
}

export function checkAngleSum(
	calculationData: FrsAngleSumCalculation,
	recalculatedTypes: FrsCalculationType[],
	calculations: FrsCalculation[],
	initialValue?: number
): number | undefined {
	if (recalculatedTypes.includes(calculationData.angle1) || recalculatedTypes.includes(calculationData.angle2)) {
		const angle1 = calculations.find((c) => c.id === calculationData.angle1)?.value
		const angle2 = calculations.find((c) => c.id === calculationData.angle2)?.value
		if (angle1 !== undefined && angle2 !== undefined) {
			return calculateAngleSum(angle1, angle2)
		}
	}

	return initialValue
}

export function checkAngleMultiplicationTarget(
	calculationData: FrsAngleMultiplicationCalculation,
	recalculatedTypes: FrsCalculationType[],
	calculations: FrsCalculation[]
): number | undefined {
	if (
		recalculatedTypes.includes(calculationData.targetAngle1) ||
		recalculatedTypes.includes(calculationData.targetAngle2)
	) {
		const angle1 = calculations.find((c) => c.id === calculationData.targetAngle1)?.value
		const angle2 = calculations.find((c) => c.id === calculationData.targetAngle2)?.value
		if (angle1 !== undefined && angle2 !== undefined) {
			return calculateAngleMultiplicationTarget(calculationData, angle1, angle2)
		}
	}
	return
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

function calculateAngleMultiplicationTarget(
	data: FrsAngleMultiplicationCalculation,
	angle1: number,
	angle2: number
): number {
	return data.targetStartValue + data.targetFactor1 * angle1 + data.targetFactor2 * angle2
}

function calculateAngleSum(angle1: number, angle2: number): number {
	return angle1 + angle2
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

function calculateDistance(edge: FrsEdge, point: FrsMark, marks: FrsMark[]): number | undefined {
	const mark1 = marks.find((m) => m.id === edge.markType1)
	const mark2 = marks.find((m) => m.id === edge.markType2)
	if (!mark1?.position || !mark2?.position || !point.position) return

	const v1 = new Vector3(mark1.position.x, mark1.position.y, mark1.position.z)
	const v2 = new Vector3(mark2?.position.x, mark2?.position.y, mark2?.position.z)
	const p = new Vector3(point.position.x, point.position.y, point.position.z)

	return getNormalIntersection(v1, v2, p).distanceTo(p)
}

function getNormalIntersection(v1: Vector3, v2: Vector3, p: Vector3): Vector3 {
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

function calculateQuotient(
	line1point1: FrsMark,
	line1point2: FrsMark,
	line2point1: FrsMark,
	line2point2: FrsMark,
	mmPerPixel: number
): number | undefined {
	const p11 = line1point1.position
	const p12 = line1point2.position
	const p21 = line2point1.position
	const p22 = line2point2.position

	if (!p11 || !p12 || !p21 || !p22) return

	const v11 = new Vector3(p11.x, p11.y, p11.z)
	const v12 = new Vector3(p12.x, p12.y, p12.z)
	const v21 = new Vector3(p21.x, p21.y, p21.z)
	const v22 = new Vector3(p22.x, p22.y, p22.z)

	return (getDistanceBetweenInMm(v11, v12, mmPerPixel) / getDistanceBetweenInMm(v21, v22, mmPerPixel)) * 100
}

function getDistanceBetweenInMm(v1: Vector3, v2: Vector3, mmPerPixel: number): number {
	const distance = v1.distanceTo(v2)
	return distance * mmPerPixel
}
