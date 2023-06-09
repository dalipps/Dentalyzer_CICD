import { HttpClient, HttpClientModule } from '@angular/common/http'
import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { bootstrapApplication } from '@angular/platform-browser'
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
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
			ServiceWorkerModule.register('ngsw-worker.js', {
				enabled: !isDevMode(),
				// Register the ServiceWorker as soon as the app is stable
				// or after 30 seconds (whichever comes first).
				registrationStrategy: 'registerWhenStable:30000',
			}),
			TranslateModule.forRoot({
				defaultLanguage: 'de',
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient],
				},
			}),
			MatDialogModule,
			MatSnackBarModule
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
