import { StoreError } from '@dentalyzer/models'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { FrsApiActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'

export const FRS_FEATURE_KEY = 'frs'

export interface FrsState extends EntityState<FrsAnalysis> {
	initialized: boolean
	loaded: boolean
	updatedAt?: string
	error?: StoreError
}

export interface FrsPartialState {
	readonly [FRS_FEATURE_KEY]: FrsState
}

export const frsAdapter: EntityAdapter<FrsAnalysis> = createEntityAdapter<FrsAnalysis>()

export const initialFrsState: FrsState = frsAdapter.getInitialState({
	initialized: false,
	loaded: false,
})

const reducer = createReducer(
	initialFrsState,
	on(FrsPageActions.init, (state) => ({
		...state,
		loaded: false,
		error: undefined,
		updatedAt: undefined,
		initialized: false,
	})),
	on(FrsApiActions.loadFrsSuccess, (state, { frsAnalyses }) =>
		frsAdapter.setAll(frsAnalyses, {
			...state,
			loaded: true,
			updatedAt: new Date().toJSON(),
		})
	),
	on(FrsApiActions.loadFrsFailure, (state, { error }) => ({ ...state, error })),
	on(FrsApiActions.initSuccess, (state, { frsAnalyses }) =>
		frsAdapter.setAll(frsAnalyses, { ...state, initialized: true })
	),
	on(FrsApiActions.initFailure, (state, { error }) => ({ ...state, error }))
)

export function frsReducer(state: FrsState | undefined, action: Action) {
	return reducer(state, action)
}
