import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'dent-analysis3d',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './analysis3d.component.html',
	styleUrls: ['./analysis3d.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analysis3dComponent {}
