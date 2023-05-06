import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { FrsStoreError } from './frs-store-error.model'
import { FrsAnalysis } from './frs.model'

export const FrsPageActions = createActionGroup({
	source: 'Frs Page',
	events: {
		Init: emptyProps(),
		Create: props<{ image: File }>(),
	},
})

export const FrsApiActions = createActionGroup({
	source: 'Frs API',
	events: {
		'Init Success': props<{ frsAnalyses: FrsAnalysis[] }>(),
		'Init Failure': props<{ error: FrsStoreError }>(),
	},
})
