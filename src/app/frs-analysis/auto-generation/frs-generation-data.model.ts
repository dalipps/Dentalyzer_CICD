import { FrsEdgeType } from '../edge'
import { FrsMarkType } from '../mark'

export type FrsGenerationData = FrsEdgeIntersectionGeneration | FrsHalfCuttingGeneration | FrsBisectorGeneration

export enum FrsGenerationDataType {
	EdgeIntersection = 'EdgeIntersection',
	HalfCutting = ' HalfCutting',
	Bisector = 'Bisector',
}

export type FrsEdgeIntersectionGeneration = {
	id: FrsGenerationDataType.EdgeIntersection
	edge1: FrsEdgeType
	edge2: FrsEdgeType
}

export type FrsHalfCuttingGeneration = {
	id: FrsGenerationDataType.HalfCutting
	point1: FrsMarkType
	point2: FrsMarkType
}

// handled as intersection of two lines
export type FrsBisectorGeneration = {
	id: FrsGenerationDataType.Bisector
	line1point1: FrsMarkType
	line1point2: FrsMarkType
	line2point1: FrsMarkType
	line2point2: FrsMarkType
}
