import { Injectable } from '@angular/core'
import { select } from '@ngrx/store'
import { BaseFacade } from '../common/base.facade'
import { FrsPageActions } from './frs.actions'
import { FrsState } from './frs.reducer'
import * as FrsSelectors from './frs.selectors'

@Injectable({
	providedIn: 'root',
})
export class FrsFacade extends BaseFacade<FrsState> {
	initialized$ = this.store.pipe(select(FrsSelectors.selectFrsInit))
	loaded$ = this.store.pipe(select(FrsSelectors.selectFrsLoaded))

	constructor() {
		super()
	}

	init(): void {
		this.initStore(FrsPageActions.init())
	}
}
