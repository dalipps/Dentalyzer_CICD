import { HttpClient, HttpClientModule } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { AppComponent } from './app/app.component'
import { globalRoutes } from './app/app.routes'
import { environment } from './environments/environment'
import { provideAnimations } from '@angular/platform-browser/animations'

if (environment.production) {
	enableProdMode()
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http)
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(globalRoutes),
		provideAnimations(),
		importProvidersFrom(HttpClientModule),
		importProvidersFrom(
			TranslateModule.forRoot({
				defaultLanguage: 'de',
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient],
				},
			})
		),
	],
}).catch((err) => console.error(err))
