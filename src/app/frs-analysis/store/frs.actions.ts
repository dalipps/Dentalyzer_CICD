import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { FrsStoreError } from './frs-store-error.model'
import { FrsAnalysis } from './frs.model'

export const FrsPageActions = createActionGroup({
	source: 'Frs Page',
	events: {
		Init: emptyProps(),
		Create: props<{ analysis: FrsAnalysis }>(),
		'Remove all': emptyProps(),
	},
})

export const FrsApiActions = createActionGroup({
	source: 'Frs API',
	events: {
		'Init Success': props<{ frsAnalysis: FrsAnalysis | undefined }>(),
		'Init Failure': props<{ error: FrsStoreError }>(),
	},
})
