import { Injectable } from '@angular/core'
import { select } from '@ngrx/store'
import { filter, switchMap } from 'rxjs'
import { BaseFacade } from '../common/base.facade'
import { FrsPageActions } from './frs.actions'
import { FrsState } from './frs.reducer'
import * as FrsSelectors from './frs.selectors'

@Injectable({
	providedIn: 'root',
})
export class FrsFacade extends BaseFacade<FrsState> {
	initialized$ = this.store.pipe(select(FrsSelectors.selectFrsInit))
	active$ = this.initialized$.pipe(
		filter((init) => init),
		switchMap(() => this.store.pipe(select(FrsSelectors.selectActive)))
	)

	constructor() {
		super()
	}

	init(): void {
		this.initStore(FrsPageActions.init())
	}

	generateAnalysis(image: File): void {
		console.log('to be implemented', image)
	}
}
