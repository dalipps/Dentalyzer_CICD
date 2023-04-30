import { FrsEdgeType } from '../enums/frs-edge-type'
import { FrsMark } from './frs-mark.model'

export interface FrsEdge {
	id: FrsEdgeType
	mark1?: FrsMark
	mark2?: FrsMark
	distanceInMm?: number
	visible?: boolean
}
