import { SerializableVector3 } from '@dentalyzer/common'
import { PkmEdgeGroupType, PkmEdgeType } from './pkm-edge-type'
import { pkmEdgesZahnBreite } from './pkm-edges-zahn-breite'

export interface PkmEdge {
	id: PkmEdgeType
	groupId: PkmEdgeGroupType
	distance?: number
	mark1?: SerializableVector3
	mark2?: SerializableVector3
}

const generateEdges = (edgeTypes: PkmEdgeType[], groupId: PkmEdgeGroupType) =>
	edgeTypes.map((edgeType) => ({
		id: edgeType,
		groupId,
	}))

export const initPkmEdges = (): PkmEdge[] => [
	...generateEdges(pkmEdgesZahnBreite, PkmEdgeGroupType.Zahnbreite),
	...generateEdges(pkmEdgesZahnBreite, PkmEdgeGroupType.Zahngruppe),
	...generateEdges(pkmEdgesZahnBreite, PkmEdgeGroupType.Transversal),
	...generateEdges(pkmEdgesZahnBreite, PkmEdgeGroupType.Okklusion),
]
