import { FrsAnalysis, StoreError } from '@dentalyzer/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

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
		'Load Frs Success': props<{ frsAnalyses: FrsAnalysis[] }>(),
		'Load Frs Failure': props<{ error: StoreError }>(),
	},
})
