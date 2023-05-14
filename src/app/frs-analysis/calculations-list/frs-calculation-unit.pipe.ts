import { Pipe, PipeTransform } from '@angular/core'
import { FrsCalculationUnit } from '../calculation/frs-calculation-unit.enum'

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

const FrsCalculationUnitMapping: { [key: string]: string } = {
	[FrsCalculationUnit.Degree]: '°',
	[FrsCalculationUnit.Percent]: '%',
	[FrsCalculationUnit.Millimeter]: 'mm',
}
