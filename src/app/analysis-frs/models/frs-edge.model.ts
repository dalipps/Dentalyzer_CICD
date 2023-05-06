import { Vector3 } from 'three'
import { FrsEdgeType } from '../enums/frs-edge-type.enum'

export interface FrsEdgeConfigDto {
	id: FrsEdgeType
}
export class FrsEdge implements FrsEdgeConfigDto {
	id: FrsEdgeType
	direction?: Vector3
	distanceInMm?: number
	visible?: boolean

	constructor(config: FrsEdgeConfigDto, direction?: Vector3, distanceInMm?: number, visible?: boolean) {
		this.id = config.id
		this.direction = direction
		this.distanceInMm = distanceInMm
		this.visible = visible
	}
}
