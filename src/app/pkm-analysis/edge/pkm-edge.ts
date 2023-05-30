import { SerializableVector3 } from '@dentalyzer/common'
import { PkmEdgeOkklusion } from './pkm-edges-okklusion'
import { PkmEdgeTranversal } from './pkm-edges-transversal'
import { PkmEdgeZahnBreite } from './pkm-edges-zahn-breite'
import { PkmEdgeZahnGruppe } from './pkm-edges-zahn-gruppe'

export type PkmEdgeType = PkmEdgeZahnBreite | PkmEdgeZahnGruppe | PkmEdgeTranversal | PkmEdgeOkklusion

export enum PkmEdgeGroupType {
	Zahnbreite = 'Zahnbreite',
	Zahngruppe = 'Zahngruppe',
	Transversal = 'Transversal',
	Okklusion = 'Okklusion',
}

export interface PkmEdge {
	id: PkmEdgeType
	groupId: PkmEdgeGroupType
	distance?: number
	mark1?: SerializableVector3
	mark2?: SerializableVector3
}
