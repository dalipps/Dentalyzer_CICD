import { FrsCalculation } from '../calculation'
import { frsCalculationTypeMapping } from '../calculations-list/frs-calculation-type.pipe'

export function getInterpretationKey(calculation: FrsCalculation): string | undefined {
	if (!calculation.value || !calculation.targetValueMaleOrAll) return

	if (calculation.value < calculation.targetValueMaleOrAll) {
		return frsCalculationTypeMapping[calculation.id].interpretation.smaller
	} else if (calculation.value > calculation.targetValueMaleOrAll) {
		return frsCalculationTypeMapping[calculation.id].interpretation.greater
	} else {
		return frsCalculationTypeMapping[calculation.id].interpretation.equals
	}
}
