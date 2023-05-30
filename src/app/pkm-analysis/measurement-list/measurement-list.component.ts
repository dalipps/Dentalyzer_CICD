import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { PkmEdgeType } from '../edge/pkm-edge-type'
import { PkmAnalysisService } from '../pkm-analysis.service'

@Component({
	selector: 'dent-measurement-list',
	standalone: true,
	imports: [CommonModule, TranslateModule, MatTableModule],
	templateUrl: './measurement-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasurementListComponent {
	readonly displayedColumns = ['distance', 'label']

	constructor(private pkmService: PkmAnalysisService) {}

	onRemoveEdge(edgeId: PkmEdgeType) {
		this.pkmService.removeEdge(edgeId)
	}

	onSelectionChange(edgeId: PkmEdgeType) {
		this.pkmService.setSelectedEdgeId(edgeId)
	}
}
