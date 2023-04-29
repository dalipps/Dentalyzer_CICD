import { FrsMark } from './frs-mark.model'

export interface FrsEdge {
	id: string
	mark1: FrsMark
	mark2: FrsMark
	visible?: boolean
}
