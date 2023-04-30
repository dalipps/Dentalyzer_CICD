import { createFeatureSelector, createSelector } from '@ngrx/store'
import { FRS_FEATURE_KEY, FrsState, frsAdapter } from './frs.reducer'

export const selectFrsState = createFeatureSelector<FrsState>(FRS_FEATURE_KEY)

const { selectAll, selectEntities } = frsAdapter.getSelectors()

export const selectFrsInit = createSelector(selectFrsState, (state: FrsState) => state.initialized)

export const selectFrsError = createSelector(selectFrsState, (state: FrsState) => state.error)

export const selectAllFrs = createSelector(selectFrsState, (state: FrsState) => selectAll(state))

export const selectFrsEntities = createSelector(selectFrsState, (state: FrsState) => selectEntities(state))

export const selectActiveId = createSelector(selectFrsState, (state: FrsState) => state.activeId)

export const selectActive = createSelector(selectFrsEntities, selectActiveId, (entities, activeId) =>
	activeId ? entities[activeId] : undefined
)
