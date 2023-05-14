import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseFacade } from '@dentalyzer/common'
import { select } from '@ngrx/store'
import { filter, switchMap, takeUntil } from 'rxjs'
import { IndexedDbService, TABLES } from 'src/app/common/indexed-db'
import { FrsCalculation } from '../calculation'
import { frsCalculationsConfig, frsEdgesConfig, frsMarksConfig } from '../config'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'
import { FrsPageActions } from './frs.actions'
import { FrsAnalysis } from './frs.model'
import { FrsState } from './frs.reducer'
import * as FrsSelectors from './frs.selectors'

@Injectable({
	providedIn: 'root',
})
export class FrsFacade extends BaseFacade<FrsState> {
	initialized$ = this.store.pipe(select(FrsSelectors.selectFrsInit))
	all$ = this.store.pipe(select(FrsSelectors.selectAllFrs))
	active$ = this.initialized$.pipe(
		filter((init) => init),
		switchMap(() => this.store.pipe(select(FrsSelectors.selectActive)))
	)

	private hasActiveAnalysis = false

	constructor(private dbService: IndexedDbService, private snackBar: MatSnackBar) {
		super()

		this.initialize()

		this.active$
			.pipe(
				takeUntil(this.destroy$),
				switchMap((analysis) =>
					analysis
						? this.dbService.addOrUpdateOne(TABLES.FRS_ANALYSIS, analysis)
						: this.dbService.clearAll(TABLES.FRS_ANALYSIS)
				)
			)
			.subscribe()
	}

	init(): void {
		this.initStore(FrsPageActions.init())
	}

	create(imageBase64: string): void {
		if (this.hasActiveAnalysis) {
			this.snackBar.open(t('FrsFacade.Error.HasActiveAnalysis'))
			return
		}

		let analysis = new FrsAnalysis(
			imageBase64,
			frsMarksConfig.map((c) => new FrsMark(c)),
			frsEdgesConfig.map((c) => new FrsEdge(c)),
			frsCalculationsConfig.map((c) => new FrsCalculation(c))
		)

		analysis = JSON.parse(JSON.stringify(analysis))

		this.dispatch(FrsPageActions.create({ analysis }))
	}

	removeAll(): void {
		this.dispatch(FrsPageActions.removeAll())
	}
}
