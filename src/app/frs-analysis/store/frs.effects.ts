import { Injectable } from '@angular/core'
import { BaseEffects } from '@dentalyzer/common'
import { createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of } from 'rxjs'
import { FrsStoreErrorType } from './frs-store-error.enum'
import { FrsApiActions, FrsPageActions } from './frs.actions'
import { FrsState } from './frs.reducer'

@Injectable()
export class FrsEffects extends BaseEffects<FrsState> {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrsPageActions.init),
			map(() => FrsApiActions.initSuccess({ frsAnalyses: [] })),
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

	constructor() {
		super()
	}
}
