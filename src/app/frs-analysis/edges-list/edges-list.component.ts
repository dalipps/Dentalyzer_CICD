import { NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { FrsEdge } from '../edge/frs-edge.model'
import { FrsFacade } from '../store'
import { FrsEdgeTypePipe } from './frs-edge-type.pipe'

@Component({
	selector: 'dent-edges-list',
	standalone: true,
	imports: [TranslateModule, MatTableModule, FrsEdgeTypePipe, MatButtonModule, NgFor, NgIf, MatIconModule],
	templateUrl: './edges-list.component.html',
	styleUrls: ['./edges-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdgesListComponent {
	@Input() edges: FrsEdge[] = []
	columnsToDisplay = ['edgeDescription', 'edgeIsVisible']

	constructor(private frsFacade: FrsFacade) {}

	toggleVisibility(edge: FrsEdge) {
		this.frsFacade.setEdgeVisibility(edge.id, !edge.isVisible)
	}
}
