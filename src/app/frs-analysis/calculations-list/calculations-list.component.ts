import { animate, state, style, transition, trigger } from '@angular/animations'
import { NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { FrsCalculation } from '../calculation/frs-calculation.model'
import { FrsCalculationTypePipe } from './frs-calculation-type.pipe'
import { FrsCalculationUnitPipe } from './frs-calculation-unit.pipe'

@Component({
	selector: 'dent-calculations-list',
	standalone: true,
	imports: [
		TranslateModule,
		MatTableModule,
		FrsCalculationUnitPipe,
		FrsCalculationTypePipe,
		MatButtonModule,
		NgFor,
		NgIf,
		MatIconModule,
	],
	templateUrl: './calculations-list.component.html',
	styleUrls: ['./calculations-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class CalculationsListComponent {
	@Input() calculations: FrsCalculation[] = []
	columnsToDisplay = ['calculationDescription', 'calculationValue', 'calculationTargetValue']
	expandedElement: FrsCalculation | undefined
}
