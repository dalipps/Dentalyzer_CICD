import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { PkmAnalysis } from './pkm.model'
import { PkmStoreError } from './pkm.reducer'

export const PkmActions = createActionGroup({
	source: 'Pkm',
	events: {
		Init: emptyProps(),
		'Init Success': props<{ pkmAnalysis?: PkmAnalysis }>(),
		'Init Failure': props<{ error: PkmStoreError }>(),
		Create: props<{ modelId: string }>(),

		'Remove all': emptyProps(),
	},
})
