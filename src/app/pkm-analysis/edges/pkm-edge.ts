import { SerializableVector3 } from '@dentalyzer/common'
import { PkmEdgeGroupType } from './pkm-edge-group-type'
import { PkmEdgeType } from './pkm-edge-type'

export interface PkmEdge {
	id: PkmEdgeType
	groupId: PkmEdgeGroupType
	distance?: number
	mark1?: SerializableVector3
	mark2?: SerializableVector3
}
