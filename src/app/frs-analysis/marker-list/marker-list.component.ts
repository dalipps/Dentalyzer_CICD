import { animate, state, style, transition, trigger } from '@angular/animations'
import { NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { FrsAnalysisService } from '../frs-analysis.service'
import { getTrainingImageUrl } from '../image'
import { FrsMark, FrsMarkType } from '../mark'
import { FrsFacade } from '../store'
import { FrsMarkTrainingImagePipe } from './frs-mark-training-image.pipe'
import { FrsMarkTypePipe } from './frs-mark-type.pipe'

interface ListItem {
	id: FrsMarkType
	isSet: boolean
	helperImage?: string
	isGenerated?: boolean
}

@Component({
	selector: 'dent-marker-list',
	standalone: true,
	imports: [
		TranslateModule,
		MatTableModule,
		MatButtonModule,
		FrsMarkTrainingImagePipe,
		NgFor,
		NgIf,
		FrsMarkTypePipe,
		MatIconModule,
	],
	templateUrl: './marker-list.component.html',
	styleUrls: ['./marker-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class MarkerListComponent {
	@Input() set marks(marks: FrsMark[]) {
		this.listItems = marks.map(
			(m) =>
				<ListItem>{
					id: m.id,
					isSet: !!m.position,
					helperImage: getTrainingImageUrl(m.id),
					isGenerated: !!m.generationData,
				}
		)
	}

	@Input() set selectedMarkId(markId: FrsMarkType | undefined) {
		this.selectedItem = this.listItems.find((i) => i.id === markId)
	}

	listItems: ListItem[] = []
	selectedItem: ListItem | undefined

	columnsToDisplayWithExpand = ['markStatus', 'markDescription', 'markDelete']

	constructor(private frsService: FrsAnalysisService, private frsFacade: FrsFacade) {}

	onItemClick(item: ListItem): void {
		this.selectedItem = this.selectedItem === item ? undefined : item

		this.frsService.setSelectedMarkId(this.selectedItem?.id)
	}

	onRemoveMark(id: FrsMarkType): void {
		this.frsFacade.removePositionOfMark(id)
	}
}
