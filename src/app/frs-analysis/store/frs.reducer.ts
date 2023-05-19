import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { createAnalysis } from './analysis.utils'
import { FrsStoreError } from './frs-store-error.model'
import { FrsApiActions, FrsMarkActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'
import { removePositionOfMark, setPositionOfMark } from './mark.utils'

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
	/**
	 * FrsPageActions
	 */
	on(FrsPageActions.init, (state) => ({
		...state,
		error: undefined,
		updatedAt: undefined,
		initialized: false,
	})),
	on(FrsPageActions.create, (state, { imageBase64 }) => {
		const analysis = createAnalysis(imageBase64)
		return frsAdapter.addOne({ ...analysis }, { ...state, activeId: analysis.id })
	}),
	on(FrsPageActions.removeAll, (state) => frsAdapter.removeAll(state)),
	/**
	 * FrsMarkActions
	 */
	on(FrsMarkActions.setPositionOfMark, (state, { markId, position }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? frsAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...setPositionOfMark(activeEntity, markId, position),
						},
					},
					state
			  )
			: state
	}),
	on(FrsMarkActions.removePositionOfMark, (state, { markId }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? frsAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...removePositionOfMark(activeEntity, markId),
						},
					},
					state
			  )
			: state
	}),
	/**
	 * FrsApiActions
	 */
	on(FrsApiActions.initSuccess, (state, { frsAnalysis }) => {
		return frsAnalysis
			? frsAdapter.addOne(frsAnalysis, { ...state, initialized: true, activeId: frsAnalysis.id })
			: { ...state, initialized: true }
	}),
	on(FrsApiActions.initFailure, (state, { error }) => ({ ...state, error }))
)

export function frsReducer(state: FrsState | undefined, action: Action) {
	return reducer(state, action)
}
