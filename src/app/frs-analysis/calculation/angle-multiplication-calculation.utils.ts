import { FrsCalculationType } from './frs-calculation-type.enum'
import { FrsAngleMultiplicationCalculation, FrsCalculation } from './frs-calculation.model'

export function checkAngleMultiplicationTarget(
	calculationData: FrsAngleMultiplicationCalculation,
	recalculatedTypes: FrsCalculationType[],
	calculations: FrsCalculation[],
	initialTargetValue?: number
): number | undefined {
	if (
		recalculatedTypes.includes(calculationData.targetAngle1) ||
		recalculatedTypes.includes(calculationData.targetAngle2)
	) {
		const angle1 = calculations.find((c) => c.id === calculationData.targetAngle1)?.value
		const angle2 = calculations.find((c) => c.id === calculationData.targetAngle2)?.value
		if (angle1 !== undefined && angle2 !== undefined) {
			return calculateAngleMultiplicationTarget(calculationData, angle1, angle2)
		}
	}
	return initialTargetValue
}

function calculateAngleMultiplicationTarget(
	data: FrsAngleMultiplicationCalculation,
	angle1: number,
	angle2: number
): number {
	return data.targetStartValue + data.targetFactor1 * angle1 + data.targetFactor2 * angle2
}
