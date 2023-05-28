import { FrsCalculationType } from './frs-calculation-type.enum'
import { FrsAngleSumCalculation, FrsCalculation } from './frs-calculation.model'

export function checkAngleSum(
	calculationData: FrsAngleSumCalculation,
	recalculatedTypes: FrsCalculationType[],
	calculations: FrsCalculation[],
	initialValue?: number
): number | undefined {
	if (recalculatedTypes.includes(calculationData.angle1) || recalculatedTypes.includes(calculationData.angle2)) {
		const angle1 = calculations.find((c) => c.id === calculationData.angle1)?.value
		const angle2 = calculations.find((c) => c.id === calculationData.angle2)?.value
		if (angle1 !== undefined && angle2 !== undefined) {
			return angle1 + angle2
		}
	}

	return initialValue
}
