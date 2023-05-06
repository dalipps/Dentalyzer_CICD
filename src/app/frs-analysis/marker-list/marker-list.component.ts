import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { FrsMark, FrsMarkType } from '../mark'

interface ListItem {
	id: FrsMarkType
	isSet: boolean
}

@Component({
	selector: 'dent-marker-list',
	standalone: true,
	imports: [TranslateModule, MatTableModule],
	templateUrl: './marker-list.component.html',
	styleUrls: ['./marker-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerListComponent {
	@Input() set marks(marks: FrsMark[]) {
		this.listItems = marks.map(
			(m) =>
				<ListItem>{
					id: m.id,
					isSet: !!m.position,
				}
		)
	}

	listItems: ListItem[] = []
}
