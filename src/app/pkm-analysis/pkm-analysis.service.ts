import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'
import {
	BehaviorSubject,
	EMPTY,
	Observable,
	combineLatest,
	debounceTime,
	distinctUntilChanged,
	filter,
	first,
	map,
	of,
	pairwise,
	shareReplay,
	startWith,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs'
import { Vector2 } from 'three'
import { BaseService } from '../common/base'
import { DialogComponent, DialogData } from '../dialog/dialog.component'
import { PkmEdge } from './edge/pkm-edge'
import { PkmEdgeType } from './edge/pkm-edge-type'
import { PkmEdgeZahnBreite } from './edge/pkm-edges-zahn-breite'
import { PkmRenderingService } from './rendering/pkm-rendering.service'
import { PkmFacade } from './store/pkm.facade'
import { PkmAnalysis } from './store/pkm.model'

@Injectable({
	providedIn: 'root',
})
export class PkmAnalysisService extends BaseService {
	private newAnalysisSetSubject$ = new BehaviorSubject<boolean>(false)
	private analysis: PkmAnalysis | undefined

	analysis$: Observable<PkmAnalysis | undefined> = EMPTY
	newAnalysisSet$ = this.newAnalysisSetSubject$.asObservable()

	private selectedEdgeIdSubject$ = new BehaviorSubject<PkmEdgeType | undefined>(PkmEdgeZahnBreite.Zahn11)
	selectedEdgeId$ = this.selectedEdgeIdSubject$.asObservable()

	constructor(
		private pkmFacade: PkmFacade,
		private renderingService: PkmRenderingService,
		private translate: TranslateService,
		private dialog: MatDialog
	) {
		super()

		this.selectedEdgeId$
			.pipe(
				takeUntil(this.destroy$),
				distinctUntilChanged(),
				pairwise(),
				tap(([prev]) => {
					const prevEdge = prev ? this.analysis?.edges.find((e) => e.id === prev) : undefined
					if (prevEdge && !prevEdge.distance) {
						this.pkmFacade.removeEdge(prevEdge.id)
					}
				})
			)
			.subscribe()

		this.initAnalysis()
	}

	get selectedEdge(): PkmEdge | undefined {
		if (!this.selectedEdgeIdSubject$.value) return
		return this.analysis?.edges.find((e) => e.id === this.selectedEdgeIdSubject$.value)
	}

	uploadPkm(files: FileList) {
		this.pkmFacade.create(files[0])
	}

	addMark(mousePosition: Vector2) {
		if (!this.selectedEdgeIdSubject$.value) return

		const intersection = this.renderingService.getFirstIntersection(mousePosition)
		if (!intersection) return

		this.pkmFacade.setMark(this.selectedEdgeIdSubject$.value, intersection)
	}

	removeEdge(edgeId: PkmEdgeType) {
		this.pkmFacade.removeEdge(edgeId)
	}

	resetAnalysis() {
		this.pkmFacade.removeAll()
		this.newAnalysisSetSubject$.next(false)
	}

	setSelectedEdgeId(id?: PkmEdgeType) {
		this.selectedEdgeIdSubject$.next(id)
	}

	private openExistingAnalysisDialog(): Observable<boolean> {
		const ref = this.dialog.open(DialogComponent, {
			data: <DialogData>{
				title: this.translate.instant(t('PkmAnalysis.ExistingAnalysisTitle')),
				content: this.translate.instant(t('PkmAnalysis.ExistingAnalysisContent')),
				rejectAction: () => this.pkmFacade.removeAll(),
			},
		})

		return ref.afterClosed().pipe(map(() => true))
	}

	private initAnalysis() {
		const existingAnalysisChecked$ = this.pkmFacade.active$.pipe(
			first(),
			switchMap((analysis) => {
				if (analysis) return this.openExistingAnalysisDialog()
				return of(true)
			}),
			shareReplay(1)
		)

		this.analysis$ = combineLatest([existingAnalysisChecked$, this.pkmFacade.active$]).pipe(
			filter(([existingAnalysisChecked]) => !!existingAnalysisChecked),
			map(([, analysis]) => analysis),
			tap((analysis) => (this.analysis = analysis))
		)

		combineLatest([existingAnalysisChecked$.pipe(startWith(false)), this.pkmFacade.active$])
			.pipe(
				takeUntil(this.destroy$),
				debounceTime(50),
				pairwise(),
				filter(([[prevChecked, prevAnalysis], [nextChecked, nextAnalysis]]) => {
					return (!prevAnalysis && !!nextAnalysis) || (!prevChecked && nextChecked)
				}),
				tap(() => this.newAnalysisSetSubject$.next(true))
			)
			.subscribe()
	}
}
