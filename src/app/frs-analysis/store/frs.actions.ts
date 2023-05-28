import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { FrsEdgePositionMap, FrsEdgeType } from '../edge'
import { FrsMarkType, FrsPosition } from '../mark'
import { FrsStoreError } from './frs-store-error.model'
import { FrsAnalysis } from './frs.model'

export const FrsPageActions = createActionGroup({
	source: 'Frs Page',
	events: {
		Init: emptyProps(),
		Create: props<{ imageBase64: string }>(),
		'Set calibration': props<{ mmPerPixel?: number }>(),
		'Remove all': emptyProps(),
	},
})

export const FrsMarkActions = createActionGroup({
	source: 'Frs Mark',
	events: {
		'Set position of mark': props<{
			markId: FrsMarkType
			position?: FrsPosition
			showLabel: boolean
			skipRecalculation: boolean
			isGenerated?: boolean
		}>(),
	},
})

export const FrsEdgeActions = createActionGroup({
	source: 'Frs Edge',
	events: {
		'Set directions of edges': props<{
			edgeMapping: FrsEdgePositionMap[]
			changedMarkId?: FrsMarkType
			calibrationChanged?: boolean
		}>(),
		'Set edge visibility': props<{ edgeId: FrsEdgeType; isVisible: boolean }>(),
	},
})

export const FrsCalculationsActions = createActionGroup({
	source: 'Frs Calculations',
	events: {
		Recalculate: props<{ changedMarkId?: FrsMarkType }>(),
	},
})

export const FrsApiActions = createActionGroup({
	source: 'Frs API',
	events: {
		'Init Success': props<{ frsAnalysis: FrsAnalysis | undefined }>(),
		'Init Failure': props<{ error: FrsStoreError }>(),
	},
})
