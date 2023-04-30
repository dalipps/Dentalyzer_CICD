import { StoreError } from '@dentalyzer/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { FrsAnalysis } from './frs.model'

export const FrsPageActions = createActionGroup({
	source: 'Frs Page',
	events: {
		Init: emptyProps(),
	},
})

export const FrsApiActions = createActionGroup({
	source: 'Frs API',
	events: {
		'Init Success': props<{ frsAnalyses: FrsAnalysis[] }>(),
		'Init Failure': props<{ error: StoreError }>(),
	},
})
