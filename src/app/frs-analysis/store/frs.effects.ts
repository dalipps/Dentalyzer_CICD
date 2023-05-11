import { Injectable } from '@angular/core'
import { BaseEffects } from '@dentalyzer/common'
import { createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { IndexedDbService, TABLES } from 'src/app/common/indexed-db'
import { FrsStoreErrorType } from './frs-store-error.enum'
import { FrsApiActions, FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'
import { FrsState } from './frs.reducer'

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

	constructor(private dbService: IndexedDbService) {
		super()
	}
}
