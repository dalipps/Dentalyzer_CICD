import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PageComponent } from '../page/page.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
	selector: 'dent-home',
	standalone: true,
	imports: [CommonModule, PageComponent, TranslateModule],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
