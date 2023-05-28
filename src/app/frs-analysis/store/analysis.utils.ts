import { Vector3 } from 'three'
import { FrsCalculation } from '../calculation'
import { frsCalculationsConfig, frsEdgesConfig, frsMarksConfig } from '../config'
import { FrsEdge } from '../edge'
import { FrsMark, FrsMarkType } from '../mark'
import { FrsAnalysis } from './frs.model'

export function createAnalysis(imageBase64: string): FrsAnalysis {
	return new FrsAnalysis(
		imageBase64,
		frsMarksConfig.map((c) => new FrsMark(c)),
		frsEdgesConfig.map((c) => new FrsEdge(c)),
		frsCalculationsConfig.map((c) => new FrsCalculation(c))
	)
}

export function calculateCalibration(marks: FrsMark[]): number | undefined {
	const c1 = marks.find((m) => m.id === FrsMarkType.Calibration1)?.position
	const c2 = marks.find((m) => m.id === FrsMarkType.Calibration2)?.position
	if (!c1 || !c2) return
	const v1 = new Vector3(c1.x, c1.y, c1.z)
	const v2 = new Vector3(c2.x, c2.y, c2.z)
	return v1.distanceTo(v2) / 10
}
