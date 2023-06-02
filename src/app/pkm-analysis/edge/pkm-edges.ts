import { SerializableVector3 } from '@dentalyzer/common'
import { PkmEdgeGroupType, PkmEdgeType } from './pkm-edge'
import { pkmEdgesOkklusion } from './pkm-edges-okklusion'
import { pkmEdgesTransversal } from './pkm-edges-transversal'
import { pkmEdgesZahnBreite } from './pkm-edges-zahn-breite'
import { pkmEdgesZahnGruppe } from './pkm-edges-zahn-gruppe'

export interface PkmEdge {
	id: PkmEdgeType
	groupId: PkmEdgeGroupType
	distance?: number
	mark1?: SerializableVector3
	mark2?: SerializableVector3
	isUpper?: boolean
}

const generateEdges = (edgeTypes: PkmEdgeType[], groupId: PkmEdgeGroupType) =>
	edgeTypes.map((edgeType) => ({
		id: edgeType,
		groupId,
	}))

export const initPkmEdges = (): PkmEdge[] => [
	...generateEdges(pkmEdgesZahnBreite, PkmEdgeGroupType.Zahnbreite),
	...generateEdges(pkmEdgesZahnGruppe, PkmEdgeGroupType.Zahngruppe),
	...generateEdges(pkmEdgesTransversal, PkmEdgeGroupType.Transversal),
	...generateEdges(pkmEdgesOkklusion, PkmEdgeGroupType.Okklusion),
]
