import { APP_INITIALIZER, EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core'
import { FrsEffects, FrsFacade, fromFrs } from '@dentalyzer/stores'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'

export function provideApp(): (Provider | EnvironmentProviders)[] {
	return [
		provideState(fromFrs.FRS_FEATURE_KEY, fromFrs.frsReducer),
		provideEffects(FrsEffects),
		makeEnvironmentProviders([
			{
				provide: APP_INITIALIZER,
				useFactory: (frsFacade: FrsFacade) => () => {
					frsFacade.init()
				},
				multi: true,
				deps: [FrsFacade],
			},
		]),
	]
}
