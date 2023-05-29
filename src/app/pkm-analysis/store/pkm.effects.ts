import { Injectable } from '@angular/core'
import { BaseEffects, IndexedDbService, TABLES } from '@dentalyzer/common'
import { createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { PkmActions } from './pkm.actions'
import { PkmAnalysis } from './pkm.model'
import { PkmState, PkmStoreErrorType } from './pkm.reducer'

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

	constructor(private dbService: IndexedDbService) {
		super()
	}
}
