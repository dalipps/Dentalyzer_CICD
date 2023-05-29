import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'
import {
	BehaviorSubject,
	EMPTY,
	Observable,
	combineLatest,
	distinctUntilChanged,
	filter,
	first,
	map,
	of,
	shareReplay,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs'
import { BaseService } from '../common/base'
import { DialogComponent, DialogData } from '../dialog/dialog.component'
import { PkmFacade } from './store/pkm.facade'
import { PkmAnalysis } from './store/pkm.model'

@Injectable({
	providedIn: 'root',
})
export class PkmAnalysisService extends BaseService {
	private hasCurrentAnalysisSubject$ = new BehaviorSubject(false)

	analysis$: Observable<PkmAnalysis | undefined> = EMPTY
	hasCurrentAnalysis$ = this.hasCurrentAnalysisSubject$.asObservable()

	constructor(private pkmFacade: PkmFacade, private translate: TranslateService, private dialog: MatDialog) {
		super()

		this.initAnalysis()
	}

	uploadPkm(files: FileList) {
		this.pkmFacade.create(files[0])
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
			map(([, analysis]) => analysis)
		)

		combineLatest([existingAnalysisChecked$, this.analysis$])
			.pipe(
				takeUntil(this.destroy$),
				filter(([checked]) => !!checked),
				distinctUntilChanged((prev, next) => !prev && !!next),
				tap(() => this.hasCurrentAnalysisSubject$.next(true))
			)
			.subscribe()
	}

	resetAnalysis() {
		this.pkmFacade.removeAll()
		this.hasCurrentAnalysisSubject$.next(false)
	}
}
