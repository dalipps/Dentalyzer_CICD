import { ChangeDetectionStrategy, Component, Injector } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router } from '@angular/router'
import { Language, LanguageService } from '@dentalyzer/common'
import { TranslateModule } from '@ngx-translate/core'
import { BaseComponent } from 'src/app/common/base'

@Component({
	selector: 'dent-header',
	standalone: true,
	imports: [TranslateModule, MatIconModule, MatMenuModule, MatButtonModule, MatToolbarModule],
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
	language = Language

	constructor(private router: Router, private languageService: LanguageService, injector: Injector) {
		super(injector)
	}

	goToHome(): void {
		this.router.navigateByUrl('/home')
	}

	setLanguage(newLanguage: Language): void {
		this.translateService.use(newLanguage)
		this.languageService.saveLanguage(newLanguage)
	}
}
