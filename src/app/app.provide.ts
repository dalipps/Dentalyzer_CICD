import { APP_INITIALIZER, EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'
import { FrsEffects, FrsFacade, fromFrs } from './frs-analysis/store'
import { PkmEffects } from './pkm-analysis/store/pkm.effects'
import { PkmFacade } from './pkm-analysis/store/pkm.facade'
import { pkmReducer } from './pkm-analysis/store/pkm.reducer'
import { PKM_FEATURE_KEY } from './pkm-analysis/store/pkm.selectors'

export function provideApp(): (Provider | EnvironmentProviders)[] {
	return [
		provideState(fromFrs.FRS_FEATURE_KEY, fromFrs.frsReducer),
		provideState(PKM_FEATURE_KEY, pkmReducer),
		provideEffects(FrsEffects, PkmEffects),
		makeEnvironmentProviders([
			{
				provide: APP_INITIALIZER,
				useFactory: (frsFacade: FrsFacade, pkmFacade: PkmFacade) => () => {
					frsFacade.init()
					pkmFacade.init()
				},
				multi: true,
				deps: [FrsFacade, PkmFacade],
			},
		]),
	]
}
