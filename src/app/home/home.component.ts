import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { Path } from '../app.routes'

@Component({
	selector: 'dent-home',
	standalone: true,
	imports: [TranslateModule, MatButtonModule, RouterModule],
	templateUrl: './home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	readonly frsAnalysisPath = `/${Path.FrsAnalysis}`
	readonly pkmAnalysisPath = `/${Path.PkmAnalysis}`
}
