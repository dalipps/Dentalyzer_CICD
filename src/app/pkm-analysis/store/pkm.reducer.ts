import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { PkmActions } from './pkm.actions'
import { PkmAnalysis } from './pkm.model'
import { initPkmAnalysis, removeEdge, setMark } from './pkm.store.utils'

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
		const analysis = initPkmAnalysis(modelId)
		return pkmAdapter.addOne({ ...analysis }, { ...state, activeId: analysis.id })
	}),
	on(PkmActions.setMark, (state, { edgeId, position }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? pkmAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...setMark(activeEntity, edgeId, position),
						},
					},
					state
			  )
			: state
	}),
	on(PkmActions.removeEdge, (state, { edgeId }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? pkmAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...removeEdge(activeEntity, edgeId),
						},
					},
					state
			  )
			: state
	}),
	on(PkmActions.removeAll, (state) => pkmAdapter.removeAll(state))
)

export const pkmReducer = (state: PkmState | undefined, action: Action) => reducer(state, action)
