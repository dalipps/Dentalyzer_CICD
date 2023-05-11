import { Pipe, PipeTransform } from '@angular/core'
import { getTrainingImageUrl } from '../image'
import { FrsMarkType } from '../mark/frs-mark-type.enum'

@Pipe({
	name: 'frsMarkTrainingImage',
	standalone: true,
	pure: true,
})
export class FrsMarkTrainingImagePipe implements PipeTransform {
	transform(type: FrsMarkType): string {
		return getTrainingImageUrl(type)
	}
}
