import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'dent-edges-list',
	standalone: true,
	imports: [],
	templateUrl: './edges-list.component.html',
	styleUrls: ['./edges-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdgesListComponent {}
