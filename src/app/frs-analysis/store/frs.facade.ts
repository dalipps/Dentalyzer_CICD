import { Injectable } from '@angular/core'
import { BaseFacade } from '@dentalyzer/common'
import { select } from '@ngrx/store'
import { filter, switchMap } from 'rxjs'
import { IndexedDbService } from 'src/app/common/indexed-db'
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

	constructor(private dbService: IndexedDbService) {
		super()

		this.dbService.recreateDatabase()
	}

	init(): void {
		this.initStore(FrsPageActions.init())
	}

	create(image: File): void {
		this.dispatch(FrsPageActions.create({ image }))
	}
}