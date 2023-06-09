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
import * as THREE from 'three'
import { BaseService } from '../common/base'
import { DialogComponent, DialogData } from '../dialog/dialog.component'
import { convertImageToBase64 } from './image'
import { FrsMark, FrsMarkType } from './mark'
import { FrsRenderingService, ObjectType } from './rendering'
import { FrsAnalysis, FrsFacade } from './store'

export const MARKER_Z_RAISE = 0.003

@Injectable({
	providedIn: 'root',
})
export class FrsAnalysisService extends BaseService {
	private selectedMarkIdSubject$ = new BehaviorSubject<FrsMarkType | undefined>(undefined)
	private newAnalysisSetSubject$ = new BehaviorSubject<boolean>(false)

	analysis$: Observable<FrsAnalysis | undefined> = EMPTY
	newAnalysisSet$ = this.newAnalysisSetSubject$.asObservable()
	selectedMarkId$ = this.selectedMarkIdSubject$.asObservable()

	constructor(
		private frsFacade: FrsFacade,
		private translateService: TranslateService,
		private renderingService: FrsRenderingService,
		private dialog: MatDialog
	) {
		super()
		this.initAnalysis()
	}

	hanleFilesUpload(fileList: FileList): void {
		convertImageToBase64(fileList[0])
			.pipe(
				first(),
				tap((imageBase64) => this.frsFacade.create(imageBase64))
			)
			.subscribe()
	}

	reset(): void {
		this.frsFacade.removeAll()
		this.newAnalysisSetSubject$.next(false)
	}

	setSelectedMarkId(id: FrsMarkType | undefined): void {
		this.selectedMarkIdSubject$.next(id)
	}

	addMarker(mousePosition: THREE.Vector2): void {
		if (!this.selectedMarkIdSubject$.value) return

		const model = this.renderingService.getSceneChild(ObjectType.Model)
		const intersection = model ? this.renderingService.getFirstIntersection(mousePosition, model) : undefined

		if (!intersection) return
		intersection.z += MARKER_Z_RAISE

		this.frsFacade.setPositionOfMark(this.selectedMarkIdSubject$.value, intersection, true)
	}

	resetMarker(markId: FrsMarkType, mousePosition: THREE.Vector2, isSelectedMarkId: boolean): void {
		const model = this.renderingService.getSceneChild(ObjectType.Model)
		const intersection = model ? this.renderingService.getFirstIntersection(mousePosition, model) : undefined
		if (!intersection) return
		intersection.z += MARKER_Z_RAISE

		this.renderingService.removeLabel(markId)
		this.frsFacade.setPositionOfMark(markId, intersection, isSelectedMarkId)
	}

	checkSelectedMarker(mousePosition: THREE.Vector2): THREE.Object3D | undefined {
		const allMarkers = this.renderingService.getSceneChildren(ObjectType.Marker)
		return allMarkers?.find((m) => this.renderingService.getFirstIntersection(mousePosition, m))
	}

	getMarkForMarker(markId: FrsMarkType): Observable<FrsMark | undefined> {
		return this.analysis$.pipe(map((a) => a?.marks.find((m) => m.id === markId)))
	}

	private openExistingAnalysisDialog(): Observable<boolean> {
		const ref = this.dialog.open(DialogComponent, {
			data: <DialogData>{
				title: this.translateService.instant(t('FrsAnalysis.ExistingAnalysisTitle')),
				content: this.translateService.instant(t('FrsAnalysis.ExistingAnalysisContent')),
				rejectAction: () => this.frsFacade.removeAll(),
			},
		})

		return ref.afterClosed().pipe(map(() => true))
	}

	private initAnalysis() {
		const existingAnalysisChecked$ = this.frsFacade.active$.pipe(
			first(),
			switchMap((analysis) => {
				if (analysis) return this.openExistingAnalysisDialog()
				return of(true)
			}),
			shareReplay(1)
		)

		this.analysis$ = combineLatest([existingAnalysisChecked$, this.frsFacade.active$]).pipe(
			filter(([existingAnalysisChecked]) => !!existingAnalysisChecked),
			map(([, analysis]) => analysis)
		)

		combineLatest([existingAnalysisChecked$.pipe(startWith(false)), this.frsFacade.active$])
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
