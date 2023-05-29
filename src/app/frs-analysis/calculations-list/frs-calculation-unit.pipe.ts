import { Pipe, PipeTransform } from '@angular/core'
import { FrsCalculationUnit } from '../calculation'

@Pipe({
	name: 'frsCalculationUnit',
	standalone: true,
	pure: true,
})
export class FrsCalculationUnitPipe implements PipeTransform {
	transform(type: FrsCalculationUnit): string {
		return FrsCalculationUnitMapping[type]
	}
}

export const FrsCalculationUnitMapping: { [key: string]: string } = {
	[FrsCalculationUnit.Degree]: '°',
	[FrsCalculationUnit.Percent]: '%',
	[FrsCalculationUnit.Millimeter]: 'mm',
}
