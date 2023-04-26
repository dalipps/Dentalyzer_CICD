import { HttpClient, HttpClientModule } from '@angular/common/http'
import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { AppComponent } from './app/app.component'
import { provideApp } from './app/app.provide'
import { globalRoutes } from './app/app.routes'
import { environment } from './environments/environment'

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
		importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
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
		provideApp(),
		provideStore(undefined, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true,
				strictActionWithinNgZone: true,
				strictActionTypeUniqueness: true,
			},
		}),
		provideStoreDevtools({
			maxAge: 25,
			logOnly: !isDevMode(),
			autoPause: true,
			trace: false,
			traceLimit: 75,
		}),
		provideEffects(),
	],
}).catch((err) => console.error(err))
