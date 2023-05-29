import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { take } from 'rxjs'
import { Language, LanguageService, SwUpdateService } from './common'
import { HeaderComponent } from './header/header.component'

@Component({
	standalone: true,
	selector: 'dent-root',
	imports: [CommonModule, RouterModule, HeaderComponent],
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'Dentalyzer'

	constructor(
		private languageService: LanguageService,
		private swUpdateService: SwUpdateService,
		private translateService: TranslateService
	) {
		this.initLanguage()
		this.handleSwUpdates()
	}

	private initLanguage(): void {
		this.translateService.setDefaultLang(Language.German)

		const savedLanguage = this.languageService.getCurrentLanguage()

		if (savedLanguage) {
			this.translateService.use(savedLanguage)
		} else if (navigator.language.includes(Language.English)) {
			this.translateService.use(Language.English)
		} else {
			this.translateService.use(Language.German)
		}
	}

	private handleSwUpdates() {
		this.swUpdateService.checkForUpdates().pipe(take(1)).subscribe()
	}
}
