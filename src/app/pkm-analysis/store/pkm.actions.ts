import { SerializableVector3 } from '@dentalyzer/common'
import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { PkmEdgeType } from '../edge/pkm-edge'
import { PkmAnalysis } from './pkm.model'
import { PkmStoreError } from './pkm.reducer'

export const PkmActions = createActionGroup({
	source: 'Pkm',
	events: {
		Init: emptyProps(),
		'Init Success': props<{ pkmAnalysis?: PkmAnalysis }>(),
		'Init Failure': props<{ error: PkmStoreError }>(),
		Create: props<{ modelId: string }>(),
		'Set mark': props<{ edgeId: PkmEdgeType; position: SerializableVector3; isUpper: boolean }>(),
		'Remove edge': props<{ edgeId: PkmEdgeType }>(),
		'Remove all': emptyProps(),
	},
})
