import { Observable, fromEvent, map } from 'rxjs'
import { FrsMarkType } from '../mark'

export function getTrainingImageUrl(type: FrsMarkType): string {
	return `assets/images/frs/${type}.png`
}

export function convertImageToBase64(image: File): Observable<string> {
	const reader = new FileReader()
	reader.readAsDataURL(image)
	return fromEvent(reader, 'loadend').pipe(map(() => reader.result as string))
}
