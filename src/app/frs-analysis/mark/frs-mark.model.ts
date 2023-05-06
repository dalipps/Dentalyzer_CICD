import { Vector3 } from 'three'
import { FrsCalculationType } from '../calculation'
import { FrsEdgeType } from '../edge/frs-edge-type.enum'
import { FrsMarkType } from './frs-mark-type.enum'

// Generated from Backend
export interface FrsMarkConfigDto {
	id: FrsMarkType
	edgeTypes: FrsEdgeType[]
	calculationTypes: FrsCalculationType[]
	isGenerated?: boolean
}

export class FrsMark implements FrsMarkConfigDto {
	id: FrsMarkType
	edgeTypes: FrsEdgeType[]
	calculationTypes: FrsCalculationType[]
	isGenerated?: boolean
	position?: Vector3
	isSelected?: boolean

	constructor(config: FrsMarkConfigDto, position?: Vector3, isSelected?: boolean) {
		this.id = config.id
		this.edgeTypes = config.edgeTypes
		this.calculationTypes = config.calculationTypes
		this.isGenerated = config.isGenerated
		this.position = position
		this.isSelected = isSelected
	}
}
