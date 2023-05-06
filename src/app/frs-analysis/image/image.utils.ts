import { FrsMarkType } from '../mark'

export function getTrainingImageUrl(type: FrsMarkType): string {
	return `assets/images/frs/${type}.png`
}
