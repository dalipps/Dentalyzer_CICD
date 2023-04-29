import { FrsCalibration, FrsEdge, FrsMark } from '@dentalyzer/analysis/frs'
export interface FrsAnalysis {
	id: string
	modelId: string
	marks: FrsMark[]
	edges: FrsEdge[]
	calibration?: FrsCalibration
}
