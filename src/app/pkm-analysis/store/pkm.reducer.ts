import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { PkmActions } from './pkm.actions'
import { PkmAnalysis } from './pkm.model'

export enum PkmStoreErrorType {
	Init,
}

export interface PkmStoreError {
	id?: PkmStoreErrorType
	title?: string
	message?: string
}

export interface PkmState extends EntityState<PkmAnalysis> {
	initialized: boolean
	activeId?: string
	error?: PkmStoreError
}

export const pkmAdapter: EntityAdapter<PkmAnalysis> = createEntityAdapter<PkmAnalysis>()

const initialPkmState: PkmState = pkmAdapter.getInitialState({ initialized: false })

const reducer = createReducer(
	initialPkmState,

	on(PkmActions.init, (state) => ({
		...state,
		error: undefined,
		initialized: false,
	})),

	on(PkmActions.initSuccess, (state, { pkmAnalysis }) => {
		return pkmAnalysis
			? pkmAdapter.addOne(pkmAnalysis, { ...state, initialized: true, activeId: pkmAnalysis.id })
			: { ...state, initialized: true }
	}),

	on(PkmActions.initFailure, (state, { error }) => ({ ...state, error })),

	on(PkmActions.create, (state, { modelId }) => {
		const analysis = new PkmAnalysis(modelId)
		return pkmAdapter.addOne({ ...analysis }, { ...state, activeId: analysis.id })
	}),

	on(PkmActions.removeAll, (state) => pkmAdapter.removeAll(state))
)

export const pkmReducer = (state: PkmState | undefined, action: Action) => reducer(state, action)
