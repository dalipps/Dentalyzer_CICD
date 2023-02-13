import { ChangeDetectionStrategy, Component, Injector } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SlideMenuModule } from 'primeng/slidemenu'
import { ButtonModule } from 'primeng/button'
import { MenuItem } from 'primeng/api'
import { EMPTY, map, Observable } from 'rxjs'
import { BaseComponent } from '@dentalyzer/common'
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateModule } from '@ngx-translate/core'

@Component({
	selector: 'dent-header',
	standalone: true,
	imports: [CommonModule, SlideMenuModule, ButtonModule, TranslateModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
	items$: Observable<MenuItem[]> = EMPTY
	constructor(injector: Injector) {
		super(injector)

		this.items$ = this.translateOnChange([_('Header.Menu.Language')]).pipe(
			map((translations: any) => {
				const items: MenuItem[] = [
					{
						id: '0',
						label: translations['Header.Menu.Language'],
					},
				]

				return items
			})
		)
	}
}
