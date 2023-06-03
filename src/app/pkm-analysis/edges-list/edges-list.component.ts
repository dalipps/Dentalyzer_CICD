import { animate, state, style, transition, trigger } from '@angular/animations'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { Dictionary } from 'lodash'
import { groupBy } from 'lodash-es'
import { PkmEdge, PkmEdgeGroupType, PkmEdgeType } from '../edge/pkm-edge'
import { PkmAnalysisService } from '../pkm-analysis.service'
import { PkmEdgeGroupPipe } from './pkm-edge-group.pipe'
import { PkmEdgeTypePipe } from './pkm-edge-type.pipe'

interface ListGroup {
	id: PkmEdgeGroupType
	isExpanded: boolean
}

@Component({
	selector: 'dent-edges-list',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		TranslateModule,
		ScrollingModule,
		PkmEdgeTypePipe,
		PkmEdgeGroupPipe,
		MatIconModule,
		MatButtonModule,
		NgIf,
		NgClass,
	],
	templateUrl: './edges-list.component.html',
	styleUrls: ['./edges-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class EdgesListComponent {
	readonly displayedColumns = ['distance', 'label', 'delete']
	listItems: Dictionary<PkmEdge[]> | undefined
	listGroups: ListGroup[] = []
	selectedItem: ListGroup | undefined

	@Input() set edges(edges: PkmEdge[] | undefined) {
		this.listItems = groupBy(edges, (edge) => edge.groupId)
		this.listGroups = Object.keys(this.listItems).map(
			(key) => <ListGroup>{ id: key as PkmEdgeGroupType, isExpanded: false }
		)
	}

	constructor(private pkmService: PkmAnalysisService) {}

	onRemoveEdge(edgeId: PkmEdgeType) {
		this.pkmService.removeEdge(edgeId)
	}

	onSelectionChange(edgeId: PkmEdgeType) {
		this.pkmService.setSelectedEdgeId(edgeId)
	}

	onGroupExpansionChange(group: ListGroup) {
		this.selectedItem = this.selectedItem === group ? undefined : group
	}
}
