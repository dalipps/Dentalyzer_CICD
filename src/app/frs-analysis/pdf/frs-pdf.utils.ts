import { FrsCalculation } from '../calculation'
import { frsCalculationTypeMapping } from '../calculations-list/frs-calculation-type.pipe'

export function getInterpretationKey(calculation: FrsCalculation): string | undefined {
	if (!calculation.value || !calculation.targetValueMaleOrAll) return

	if (calculation.value - (calculation.deviation ?? 0) < calculation.targetValueMaleOrAll) {
		return frsCalculationTypeMapping[calculation.id].interpretation.smaller
	}
	if (calculation.value + (calculation.deviation ?? 0) > calculation.targetValueMaleOrAll) {
		return frsCalculationTypeMapping[calculation.id].interpretation.greater
	}
	return frsCalculationTypeMapping[calculation.id].interpretation.equals
}
