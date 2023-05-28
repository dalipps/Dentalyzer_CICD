import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { recalculate } from '../calculation/calculation.utils'
import { setDirectionsOfEdges, setEdgeVisibility } from '../edge/edge.utils'
import { createAnalysis } from './analysis.utils'
import { FrsStoreError } from './frs-store-error.model'
import { FrsApiActions, FrsCalculationsActions, FrsEdgeActions, FrsMarkActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'
import { setPositionOfMark } from './mark.utils'

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
	on(FrsPageActions.setCalibration, (state, { mmPerPixel }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? frsAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							mmPerPixel: mmPerPixel,
						},
					},
					state
			  )
			: state
	}),
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
	/**
	 * FrsEdgeActions
	 */
	on(FrsEdgeActions.setDirectionsOfEdges, (state, { edgeMapping }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? frsAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...setDirectionsOfEdges(activeEntity, edgeMapping),
						},
					},
					state
			  )
			: state
	}),
	on(FrsEdgeActions.setEdgeVisibility, (state, { edgeId, isVisible }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? frsAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...setEdgeVisibility(activeEntity, edgeId, isVisible),
						},
					},
					state
			  )
			: state
	}),
	/**
	 * FrsCalculationActions
	 */
	on(FrsCalculationsActions.recalculate, (state, { changedMarkId }) => {
		const activeEntity = state.activeId ? state.entities[state.activeId] : undefined
		return activeEntity
			? frsAdapter.updateOne(
					{
						id: activeEntity.id,
						changes: {
							...recalculate(activeEntity, changedMarkId),
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
