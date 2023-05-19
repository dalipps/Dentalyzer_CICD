import { FrsCalculation } from '../calculation'
import { frsCalculationsConfig, frsEdgesConfig, frsMarksConfig } from '../config'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'
import { FrsAnalysis } from './frs.model'

export function createAnalysis(imageBase64: string): FrsAnalysis {
	return new FrsAnalysis(
		imageBase64,
		frsMarksConfig.map((c) => new FrsMark(c)),
		frsEdgesConfig.map((c) => new FrsEdge(c)),
		frsCalculationsConfig.map((c) => new FrsCalculation(c))
	)
}
