import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'

@Component({
	selector: 'dent-measurement-list',
	standalone: true,
	imports: [CommonModule, TranslateModule, MatTableModule],
	templateUrl: './measurement-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasurementListComponent {
	readonly displayedColumns = ['distance', 'label']
}
