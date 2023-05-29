import { FrsCalculation } from '../calculation'
import { frsCalculationTypeMapping } from '../calculations-list/frs-calculation-type.pipe'

export const FILE_TYPE = 'pdf'

export function getPdfTemplatePath(fileName: string): string {
	return `assets/pdfs/${fileName}.${FILE_TYPE}`
}

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

export function downloadPdf(pdf: Blob, fileName: string): void {
	const link = document.createElement('a')
	link.download = fileName + '.' + FILE_TYPE
	link.href = URL.createObjectURL(pdf)
	link.click()
}
