import { animate, state, style, transition, trigger } from '@angular/animations'
import { NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { getTrainingImageUrl } from '../image'
import { FrsMark, FrsMarkType } from '../mark'
import { FrsMarkTrainingImagePipe } from './frs-mark-training-image.pipe'
import { FrsMarkTrainingTextPipe } from './frs-mark-training-text.pipe'
import { FrsMarkTypePipe } from './frs-mark-type.pipe'

interface ListItem {
	id: FrsMarkType
	isSet: boolean
	helperImage?: string
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
		FrsMarkTrainingTextPipe,
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
				}
		)
	}

	listItems: ListItem[] = []
	expandedElement: ListItem | undefined

	columnsToDisplayWithExpand = ['status', 'description', 'delete']
}
