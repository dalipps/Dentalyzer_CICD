import { Injectable } from '@angular/core'
import { BaseEffects, IndexedDbService, TABLES } from '@dentalyzer/common'
import { concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { PkmRenderingService } from '../rendering/pkm-rendering.service'
import { PkmActions } from './pkm.actions'
import { PkmAnalysis } from './pkm.model'
import { PkmState, PkmStoreErrorType } from './pkm.reducer'
import * as PkmSelectors from './pkm.selectors'

@Injectable()
export class PkmEffects extends BaseEffects<PkmState> {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PkmActions.init),
			switchMap(() => this.dbService.getFirst<PkmAnalysis | undefined>(TABLES.PKM_ANALYSIS)),
			map((existingAnalysis) => PkmActions.initSuccess({ pkmAnalysis: existingAnalysis })),
			catchError(() => {
				return of(
					PkmActions.initFailure({
						error: {
							id: PkmStoreErrorType.Init,
							title: 'Initialization error',
							message: "The store couldn't be initialized",
						},
					})
				)
			})
		)
	)

	setMark$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(PkmActions.setMark),
				concatLatestFrom(() => this.store$.select(PkmSelectors.selectActive)),
				tap(([action, analysis]) => {
					this.renderingService.addMarker(action.edgeId, action.position)

					const foundEdge = analysis?.edges.find((e) => e.id === action.edgeId)
					if (foundEdge && foundEdge.distance) {
						this.renderingService.addEdge(foundEdge)
					}
				})
			),
		{ dispatch: false }
	)

	removeEdge$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(PkmActions.removeEdge),
				tap((action) => this.renderingService.removeEdge(action.edgeId))
			),
		{ dispatch: false }
	)

	constructor(private dbService: IndexedDbService, private renderingService: PkmRenderingService) {
		super()
	}
}
