import { Vector3 } from 'three'
import { FrsMarkType, FrsPosition } from '../mark'
import { FrsEdgeType } from './frs-edge-type.enum'

export interface FrsEdgeConfigDto {
	id: FrsEdgeType
	markType1: FrsMarkType
	markType2: FrsMarkType
	isHelper?: boolean
}
export class FrsEdge implements FrsEdgeConfigDto {
	id: FrsEdgeType
	markType1: FrsMarkType
	markType2: FrsMarkType
	direction?: FrsPosition
	distanceInMm?: number
	isVisible?: boolean
	isHelper?: boolean

	constructor(config: FrsEdgeConfigDto, direction?: FrsPosition, distanceInMm?: number, isVisible?: boolean) {
		this.id = config.id
		this.markType1 = config.markType1
		this.markType2 = config.markType2
		this.direction = direction
		this.distanceInMm = distanceInMm
		this.isVisible = isVisible
		this.isHelper = config.isHelper
	}
}

export interface FrsEdgePositionMap {
	edgeId: FrsEdgeType
	direction?: Vector3
}
