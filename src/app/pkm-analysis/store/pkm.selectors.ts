import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PkmState, pkmAdapter } from './pkm.reducer'

const { selectEntities } = pkmAdapter.getSelectors()

export const PKM_FEATURE_KEY = 'pkm'

export const selectPkmState = createFeatureSelector<PkmState>(PKM_FEATURE_KEY)

export const selectPkmInit = createSelector(selectPkmState, (state: PkmState) => state.initialized)

export const selectPkmEntities = createSelector(selectPkmState, (state: PkmState) => selectEntities(state))

export const selectActiveId = createSelector(selectPkmState, (state: PkmState) => state.activeId)

export const selectActive = createSelector(selectPkmEntities, selectActiveId, (entities, activeId) =>
	activeId ? entities[activeId] : undefined
)
