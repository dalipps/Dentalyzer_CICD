import { FrsEdgeType } from '../edge'
import { FrsMarkType } from '../mark'

export type FrsGenerationData =
	| FrsEdgeIntersectionGeneration
	| FrsHalfCuttingGeneration
	| FrsMarkIntersectionGeneration
	| FrsBisectorGeneration

export enum FrsGenerationDataType {
	EdgeIntersection = 'EdgeIntersection',
	HalfCutting = ' HalfCutting',
	MarkIntersection = 'MarkIntersection',
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

export type FrsMarkIntersectionGeneration = {
	id: FrsGenerationDataType.MarkIntersection
	line1point1: FrsMarkType
	line1point2: FrsMarkType
	line2point1: FrsMarkType
	line2point2: FrsMarkType
}

export type FrsBisectorGeneration = {
	id: FrsGenerationDataType.Bisector
	line1point1: FrsMarkType
	line1point2: FrsMarkType
	line2point1: FrsMarkType
	line2point2: FrsMarkType
}
