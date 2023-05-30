import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { PkmEdge, PkmEdgeGroupType, PkmEdgeType } from '../edge/pkm-edge'
import { PkmAnalysisService } from '../pkm-analysis.service'
import { PkmEdgeTypePipe } from './pkm-edge-type.pipe'

interface ListItem {
	id: PkmEdgeType
	distance?: number
	isSet: boolean
}

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
		MatIconModule,
		MatButtonModule,
		NgIf,
	],
	templateUrl: './edges-list.component.html',
	styleUrls: ['./edges-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdgesListComponent {
	readonly displayedColumns = ['distance', 'label', 'delete']
	listItems: ListItem[] = []
	listGroups: ListGroup[] = []

	@Input() set edges(edges: PkmEdge[] | undefined) {
		this.listItems = edges?.map(({ id, distance }) => ({ id, distance, isSet: !!distance })) ?? []
	}

	constructor(private pkmService: PkmAnalysisService) {}

	onRemoveEdge(edgeId: PkmEdgeType) {
		this.pkmService.removeEdge(edgeId)
	}

	onSelectionChange(edgeId: PkmEdgeType) {
		this.pkmService.setSelectedEdgeId(edgeId)
	}

	onGroupExpansionChange(groupId: PkmEdgeGroupType) {
		console.log(groupId)
	}
}
