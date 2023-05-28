import { Vector3 } from 'three'
import { FrsGenerationData } from '../auto-generation'
import { FrsCalculationType } from '../calculation'
import { FrsEdgeType } from '../edge/frs-edge-type.enum'
import { FrsMarkType } from './frs-mark-type.enum'

export interface FrsMarkConfigDto {
	id: FrsMarkType
	edgeTypes: FrsEdgeType[]
	calculationTypes: FrsCalculationType[]
	generationData?: FrsGenerationData
}

export interface FrsPosition {
	x: number
	y: number
	z: number
}

export class FrsMark implements FrsMarkConfigDto {
	id: FrsMarkType
	edgeTypes: FrsEdgeType[]
	calculationTypes: FrsCalculationType[]
	generationData?: FrsGenerationData
	position?: FrsPosition
	isSelected: boolean

	constructor(config: FrsMarkConfigDto, position?: FrsPosition, isSelected = false) {
		this.id = config.id
		this.edgeTypes = config.edgeTypes
		this.calculationTypes = config.calculationTypes
		this.generationData = config.generationData
		this.position = position
		this.isSelected = isSelected
	}
}

export interface FrsMarkPositionMap {
	markId: FrsMarkType
	position?: Vector3
	showLabel?: boolean
}
