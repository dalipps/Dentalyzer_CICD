import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseFacade } from '@dentalyzer/common'
import { select } from '@ngrx/store'
import { filter, switchMap, takeUntil, tap } from 'rxjs'
import { IndexedDbService, TABLES } from 'src/app/common/indexed-db'
import { FrsEdgeType } from '../edge'
import { FrsMarkType, FrsPosition } from '../mark'
import { FrsEdgeActions, FrsMarkActions, FrsPageActions } from './frs.actions'
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

	// TODO: set to true
	private hasActiveAnalysis = false
	private setMarkIds: FrsMarkType[] = []

	constructor(private dbService: IndexedDbService, private snackBar: MatSnackBar) {
		super()

		this.initialize()

		this.active$
			.pipe(
				takeUntil(this.destroy$),
				tap((analysis) => {
					this.setMarkIds = analysis?.marks.filter((m) => m.position).map((m) => m.id) ?? []
				}),
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

		this.dispatch(FrsPageActions.create({ imageBase64 }))
	}

	setPositionOfMark(markId: FrsMarkType, position: FrsPosition, showLabel: boolean): void {
		if (this.setMarkIds.includes(markId)) this.removePositionOfMark(markId, true)
		this.dispatch(FrsMarkActions.setPositionOfMark({ markId, position, showLabel, skipRecalculation: false }))
	}

	removePositionOfMark(markId: FrsMarkType, skipRecalculation = false): void {
		this.dispatch(
			FrsMarkActions.setPositionOfMark({ markId, position: undefined, showLabel: false, skipRecalculation })
		)
	}

	setEdgeVisibility(edgeId: FrsEdgeType, isVisible: boolean): void {
		this.dispatch(FrsEdgeActions.setEdgeVisibility({ edgeId, isVisible }))
	}

	removeAll(): void {
		this.dispatch(FrsPageActions.removeAll())
	}
}
