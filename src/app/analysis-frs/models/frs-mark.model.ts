import { Vector3 } from 'three'
import { FrsEdgeType } from '../enums/frs-edge-type'
import { FrsMarkType } from '../enums/frs-mark-type.enum'

export interface FrsMark {
	id: FrsMarkType
	edgeTypes: FrsEdgeType[]
	position?: Vector3
	isSelected?: boolean
	isGenerated?: boolean
}
