import { Vector3 } from 'three'
import { FrsMarkType } from '../enums/frs-mark-type.enum'

export interface FrsMark {
	id: string
	position: Vector3
	type: FrsMarkType
	isHelper?: boolean
	automaticallySet?: boolean
}
