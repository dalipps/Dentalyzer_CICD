import { FrsCalculationType } from '../calculation'
import { FrsEdgeType } from '../edge/frs-edge-type.enum'
import { FrsMarkType } from './frs-mark-type.enum'

export interface FrsMarkConfigDto {
	id: FrsMarkType
	edgeTypes: FrsEdgeType[]
	calculationTypes: FrsCalculationType[]
	isGenerated?: boolean
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
	isGenerated?: boolean
	position?: FrsPosition
	isSelected: boolean

	constructor(config: FrsMarkConfigDto, position?: FrsPosition, isSelected = false) {
		this.id = config.id
		this.edgeTypes = config.edgeTypes
		this.calculationTypes = config.calculationTypes
		this.isGenerated = config.isGenerated
		this.position = position
		this.isSelected = isSelected
	}
}
