import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseFacade, IndexedDbService, SerializableVector3, TABLES } from '@dentalyzer/common'
import { select } from '@ngrx/store'
import { combineLatest, filter, switchMap, takeUntil } from 'rxjs'
import { Vector3 } from 'three'
import { PkmEdgeType } from '../edge/pkm-edge-type'
import { PkmActions } from './pkm.actions'
import { PkmState } from './pkm.reducer'
import { selectActive, selectPkmInit } from './pkm.selectors'

@Injectable({
	providedIn: 'root',
})
export class PkmFacade extends BaseFacade<PkmState> {
	initialized$ = this.store.pipe(select(selectPkmInit))
	active$ = this.initialized$.pipe(
		filter((init) => init),
		switchMap(() => this.store.pipe(select(selectActive)))
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
						? this.dbService.addOrUpdateOne(TABLES.PKM_ANALYSIS, analysis)
						: combineLatest([this.dbService.clearAll(TABLES.PKM_ANALYSIS), this.dbService.clearAll(TABLES.PKM_FILE)])
				)
			)
			.subscribe()
	}

	init() {
		this.initStore(PkmActions.init())
	}

	create(file: File) {
		if (this.hasActiveAnalysis) {
			this.snackBar.open(t('PkmFacade.Error.HasActiveAnalysis'))
			return
		}
		const modelId = crypto.randomUUID()
		this.dbService.addOrUpdateOne(TABLES.PKM_FILE, { id: modelId, file })
		this.dispatch(PkmActions.create({ modelId }))
	}

	setMark(edgeId: PkmEdgeType, position: Vector3) {
		const serializablePosition = <SerializableVector3>{ x: position.x, y: position.y, z: position.z }
		this.dispatch(PkmActions.setMark({ edgeId, position: serializablePosition }))
	}

	removeEdge(edgeId: PkmEdgeType) {
		this.dispatch(PkmActions.removeEdge({ edgeId }))
	}

	removeAll(): void {
		this.dispatch(PkmActions.removeAll())
	}
}
