import { Injectable } from '@angular/core'
import { BaseEffects } from '@dentalyzer/common'
import { concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, catchError, map, of, switchMap, tap } from 'rxjs'
import { IndexedDbService, TABLES } from 'src/app/common/indexed-db'
import { FrsEdgeType } from '../edge'
import { FrsRenderingService } from '../rendering/frs-rendering.service'
import { calculateCalibration } from './analysis.utils'
import { recalculateEdges } from './edge.utils'
import { FrsStoreErrorType } from './frs-store-error.enum'
import { FrsApiActions, FrsCalculationsActions, FrsEdgeActions, FrsMarkActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'
import { FrsState } from './frs.reducer'
import * as FrsSelectors from './frs.selectors'

@Injectable()
export class FrsEffects extends BaseEffects<FrsState> {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrsPageActions.init),
			switchMap(() => this.dbService.getFirst<FrsAnalysis | undefined>(TABLES.FRS_ANALYSIS)),
			map((existingAnalysis) => FrsApiActions.initSuccess({ frsAnalysis: existingAnalysis })),
			catchError(() => {
				return of(
					FrsApiActions.initFailure({
						error: {
							id: FrsStoreErrorType.Init,
							title: 'Initialization error',
							message: "The store couldn't be initialized",
						},
					})
				)
			})
		)
	)

	setPositionOfMark$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrsMarkActions.setPositionOfMark),
			concatLatestFrom(() => this.store$.select(FrsSelectors.selectActive)),
			switchMap(([data, analysis]) => {
				if (data.position) this.renderingService.addMarker(data.position, data.markId, data.showLabel)
				else this.renderingService.removeMarker(data.markId)

				if (!analysis) return EMPTY
				const mark = analysis.marks.find((m) => m.id === data.markId)
				if (!mark || data.skipRecalculation) return EMPTY

				const edges = analysis.edges.filter((e) => mark.edgeTypes.includes(e.id))
				const changedEdgeMapping = recalculateEdges(edges, analysis.marks)

				const calibrationChanged = changedEdgeMapping.some((e) => e.edgeId === FrsEdgeType.Calibration)

				return of(
					FrsEdgeActions.setDirectionsOfEdges({
						edgeMapping: changedEdgeMapping,
						// if calibration changed, recalculate everything
						changedMarkId: mark.id,
						calibrationChanged,
					})
				)
			})
		)
	)

	recaculate$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrsEdgeActions.setDirectionsOfEdges),
			concatLatestFrom(() => this.store$.select(FrsSelectors.selectActive)),
			switchMap(([data, analysis]) => {
				if (!analysis) return EMPTY

				const calibrationChanged = data.edgeMapping.some((e) => e.edgeId === FrsEdgeType.Calibration)
				if (calibrationChanged) {
					const mmPerPixel = calculateCalibration(analysis.marks)
					return of(FrsPageActions.setCalibration({ mmPerPixel }))
				}

				return EMPTY
			})
		)
	)

	setCalibration$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrsPageActions.setCalibration),
			map(() => FrsCalculationsActions.recalculate({}))
		)
	)

	setDirectionsOfEdges$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrsEdgeActions.setDirectionsOfEdges),
			concatLatestFrom(() => this.store$.select(FrsSelectors.selectActive)),
			tap(([data, analysis]) => {
				if (!analysis) return

				const changedEdges = analysis.edges.filter((e) => data.edgeMapping.map((m) => m.edgeId).includes(e.id))
				if (changedEdges) this.renderingService.redrawEdges(analysis.marks, changedEdges)
			}),
			switchMap(([data]) => {
				if (data.calibrationChanged) return EMPTY
				return of(FrsCalculationsActions.recalculate({ changedMarkId: data.changedMarkId }))
			})
		)
	)

	setEdgeVisibility$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(FrsEdgeActions.setEdgeVisibility),
				tap((data) => this.renderingService.toggleEdges([data.edgeId], data.isVisible))
			),
		{ dispatch: false }
	)

	constructor(private dbService: IndexedDbService, private renderingService: FrsRenderingService) {
		super()
	}
}
