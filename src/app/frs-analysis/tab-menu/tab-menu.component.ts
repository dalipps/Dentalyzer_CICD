import { NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { TranslateModule } from '@ngx-translate/core'
import { CalculationsListComponent } from '../calculations-list/calculations-list.component'
import { EdgesListComponent } from '../edges-list/edges-list.component'
import { MarkerListComponent } from '../marker-list/marker-list.component'
import { FrsAnalysis } from '../store'

@Component({
	selector: 'dent-tab-menu',
	standalone: true,
	imports: [NgIf, MatTabsModule, TranslateModule, CalculationsListComponent, MarkerListComponent, EdgesListComponent],
	templateUrl: './tab-menu.component.html',
	styleUrls: ['./tab-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMenuComponent {
	@Input() analysis: FrsAnalysis | undefined
}
