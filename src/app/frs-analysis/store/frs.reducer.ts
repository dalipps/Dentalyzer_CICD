import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { FrsStoreError } from './frs-store-error.model'
import { FrsApiActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'

export const FRS_FEATURE_KEY = 'frs'

export interface FrsState extends EntityState<FrsAnalysis> {
	initialized: boolean
	activeId?: string
	error?: FrsStoreError
}

export interface FrsPartialState {
	readonly [FRS_FEATURE_KEY]: FrsState
}

export const frsAdapter: EntityAdapter<FrsAnalysis> = createEntityAdapter<FrsAnalysis>()

export const initialFrsState: FrsState = frsAdapter.getInitialState({
	initialized: false,
})

const reducer = createReducer(
	initialFrsState,
	on(FrsPageActions.init, (state) => ({
		...state,
		error: undefined,
		updatedAt: undefined,
		initialized: false,
	})),
	on(FrsPageActions.create, (state, { analysis }) => frsAdapter.addOne(analysis, { ...state, activeId: analysis.id })),
	on(FrsPageActions.removeAll, (state) => frsAdapter.removeAll(state)),
	on(FrsApiActions.initSuccess, (state, { frsAnalysis }) => {
		if (frsAnalysis) return frsAdapter.addOne(frsAnalysis, { ...state, initialized: true, activeId: frsAnalysis.id })
		return { ...state, initialized: true }
	}),
	on(FrsApiActions.initFailure, (state, { error }) => ({ ...state, error }))
)

export function frsReducer(state: FrsState | undefined, action: Action) {
	return reducer(state, action)
}
