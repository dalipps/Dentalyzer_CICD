import { Vector3 } from 'three'
import { FrsMark } from '../mark'
import { FrsQuotientCalculation } from './frs-calculation.model'

export function checkQuotient(
	calculationData: FrsQuotientCalculation,
	marks: FrsMark[],
	mark?: FrsMark,
	mmPerPixel?: number,
	initialValue?: number
): number | undefined {
	// TODO: David show message toast
	if (!mmPerPixel) return

	if (
		!mark ||
		[
			calculationData.line1point1,
			calculationData.line1point2,
			calculationData.line2point1,
			calculationData.line2point2,
		].includes(mark.id)
	) {
		const line1point1 = marks.find((m) => m.id === calculationData.line1point1)
		const line1point2 = marks.find((m) => m.id === calculationData.line1point2)
		const line2point1 = marks.find((m) => m.id === calculationData.line2point1)
		const line2point2 = marks.find((m) => m.id === calculationData.line2point2)

		if (line1point1 && line1point2 && line2point1 && line2point2) {
			return calculateQuotient(line1point1, line1point2, line2point1, line2point2, mmPerPixel)
		}
	}

	return initialValue
}

function calculateQuotient(
	line1point1: FrsMark,
	line1point2: FrsMark,
	line2point1: FrsMark,
	line2point2: FrsMark,
	mmPerPixel: number
): number | undefined {
	const p11 = line1point1.position
	const p12 = line1point2.position
	const p21 = line2point1.position
	const p22 = line2point2.position

	if (!p11 || !p12 || !p21 || !p22) return

	const v11 = new Vector3(p11.x, p11.y, p11.z)
	const v12 = new Vector3(p12.x, p12.y, p12.z)
	const v21 = new Vector3(p21.x, p21.y, p21.z)
	const v22 = new Vector3(p22.x, p22.y, p22.z)

	return (getDistanceBetweenInMm(v11, v12, mmPerPixel) / getDistanceBetweenInMm(v21, v22, mmPerPixel)) * 100
}

function getDistanceBetweenInMm(v1: Vector3, v2: Vector3, mmPerPixel: number): number {
	const distance = v1.distanceTo(v2)
	return distance * mmPerPixel
}
