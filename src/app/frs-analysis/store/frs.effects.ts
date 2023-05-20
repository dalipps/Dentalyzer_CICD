import { Injectable } from '@angular/core'
import { BaseEffects } from '@dentalyzer/common'
import { concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, catchError, map, of, switchMap, tap } from 'rxjs'
import { IndexedDbService, TABLES } from 'src/app/common/indexed-db'
import { FrsRenderingService } from '../rendering/frs-rendering.service'
import { FrsStoreErrorType } from './frs-store-error.enum'
import { FrsApiActions, FrsEdgeActions, FrsMarkActions, FrsPageActions } from './frs.actions'
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
				this.renderingService.addMarker(data.position, data.markId, data.showLabel)

				if (!analysis) return EMPTY
				const mark = analysis.marks.find((m) => m.id === data.markId)
				if (!mark) return EMPTY
				const edges = analysis.edges.filter((e) => mark.edgeTypes.includes(e.id))
				const edgeMapping = this.renderingService.recalculateEdges(edges, analysis.marks)
				if (edgeMapping.length === 0) return EMPTY
				return of(FrsEdgeActions.setDirectionsOfEdges({ edgeMapping }))
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

	removePositionOfMark$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(FrsMarkActions.removePositionOfMark),
				tap((data) => this.renderingService.removeMarker(data.markId))
			),
		{ dispatch: false }
	)

	constructor(private dbService: IndexedDbService, private renderingService: FrsRenderingService) {
		super()
	}
}
