import { FrsCalculation, FrsEdge, FrsMark } from '@dentalyzer/analysis/frs'
import { frsEdgesConfig, frsMarksConfig } from '@dentalyzer/config'
import { StoreError } from '@dentalyzer/models'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { frsCalculationsConfig } from 'src/app/config/frs-calculations.config'
import { FrsApiActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'

export const FRS_FEATURE_KEY = 'frs'

export interface FrsState extends EntityState<FrsAnalysis> {
	initialized: boolean
	activeId?: string
	updatedAt?: string
	error?: StoreError
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
	on(FrsPageActions.create, (state, { image }) => {
		const newAnalysis = create(image)
		return frsAdapter.addOne(newAnalysis, state)
	}),
	on(FrsApiActions.initSuccess, (state, { frsAnalyses }) =>
		frsAdapter.setAll(frsAnalyses, { ...state, initialized: true })
	),
	on(FrsApiActions.initFailure, (state, { error }) => ({ ...state, error }))
)

export function frsReducer(state: FrsState | undefined, action: Action) {
	return reducer(state, action)
}

function create(image: File): FrsAnalysis {
	return {
		id: crypto.randomUUID(),
		image: image,
		marks: frsMarksConfig.map((c) => new FrsMark(c)),
		edges: frsEdgesConfig.map((c) => new FrsEdge(c)),
		calculations: frsCalculationsConfig.map((c) => new FrsCalculation(c)),
	}
}
