import { FrsEdgeType } from '../edge'
import { FrsInterpretation } from '../interpretation'
import { FrsMarkType } from '../mark'
import { FrsCalculationDataType } from './frs-calculation-data-type.enum'
import { FrsCalculationType } from './frs-calculation-type.enum'
import { FrsCalculationUnit } from './frs-calculation-unit.enum'

export type FrsCalculationData =
	| FrsAngleCalculation
	| FrsAngleSumCalculation
	| FrsAngleMultiplicationCalculation
	| FrsIntersectionDistanceCalculation
	| FrsQuotientCalculation
	| FrsDistanceCalculation

export interface FrsAngleCalculation {
	id: FrsCalculationDataType.Angle
	edge1: FrsEdgeType
	edge2: FrsEdgeType
	isLeft: boolean
}

export interface FrsAngleSumCalculation {
	id: FrsCalculationDataType.AngleSum
	angle1: FrsCalculationType
	angle2: FrsCalculationType
}

// targetValue gets reflected in value
export interface FrsAngleMultiplicationCalculation {
	id: FrsCalculationDataType.AngleMultiplication
	targetStartValue: number
	targetFactor1: number
	targetAngle1: FrsCalculationType
	targetFactor2: number
	targetAngle2: FrsCalculationType
}

export interface FrsIntersectionDistanceCalculation {
	id: FrsCalculationDataType.IntersectionDistance
	edge: FrsEdgeType
	point1: FrsMarkType
	point2: FrsMarkType
}

export interface FrsQuotientCalculation {
	id: FrsCalculationDataType.Quotient
	line1point1: FrsMarkType
	line1point2: FrsMarkType
	line2point1: FrsMarkType
	line2point2: FrsMarkType
}

export interface FrsDistanceCalculation {
	id: FrsCalculationDataType.Distance
	edge: FrsEdgeType
	point: FrsMarkType
	considerSign?: boolean
}

export interface FrsCalculationConfigDto {
	id: FrsCalculationType
	unit: FrsCalculationUnit
	data: FrsCalculationData
	targetValueMaleOrAll?: number
	targetValueFemale?: number
	deviation?: number
	interpretation?: FrsInterpretation
}

export class FrsCalculation implements FrsCalculationConfigDto {
	id: FrsCalculationType
	unit: FrsCalculationUnit
	data: FrsCalculationData
	targetValueMaleOrAll?: number
	targetValueFemale?: number
	deviation?: number
	value?: number

	constructor(config: FrsCalculationConfigDto, value?: number) {
		this.id = config.id
		this.unit = config.unit
		this.data = config.data
		this.targetValueMaleOrAll = config.targetValueMaleOrAll
		this.targetValueFemale = config.targetValueFemale
		this.deviation = config.deviation
		this.value = value
	}
}
