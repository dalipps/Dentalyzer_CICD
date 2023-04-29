import { FrsMarkType } from '@dentalyzer/analysis/frs'

export function getTrainingImageUrl(type: FrsMarkType): string {
	return `assets/images/frs/${type}.png`
}
