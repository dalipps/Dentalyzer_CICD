import { Vector3 } from 'three'
import { FrsMarkType } from '../mark'
import { FrsEdgeType } from './frs-edge-type.enum'

export interface FrsEdgeConfigDto {
	id: FrsEdgeType
	markType1: FrsMarkType
	markType2: FrsMarkType
}
export class FrsEdge implements FrsEdgeConfigDto {
	id: FrsEdgeType
	markType1: FrsMarkType
	markType2: FrsMarkType
	direction?: Vector3
	distanceInMm?: number
	isVisible?: boolean

	constructor(config: FrsEdgeConfigDto, direction?: Vector3, distanceInMm?: number, isVisible?: boolean) {
		this.id = config.id
		this.markType1 = config.markType1
		this.markType2 = config.markType2
		this.direction = direction
		this.distanceInMm = distanceInMm
		this.isVisible = isVisible
	}
}

export interface FrsEdgePositionMap {
	edgeId: FrsEdgeType
	direction: Vector3
}
