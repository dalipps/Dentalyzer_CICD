import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'
import { Observable, filter, first, from, map, switchMap, tap } from 'rxjs'
import { DialogComponent, DialogData } from 'src/app/dialog/dialog.component'
import { BaseService } from '../base'

@Injectable({
	providedIn: 'root',
})
export class SwUpdateService extends BaseService {
	constructor(private updates: SwUpdate, private dialog: MatDialog, private translateService: TranslateService) {
		super()
	}

	checkForUpdates(): Observable<boolean> {
		return this.updates.versionUpdates.pipe(
			filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
			map(() => true),
			tap(() => {
				const dialogRef = this.dialog.open(DialogComponent, {
					data: <DialogData>{
						title: this.translateService.instant(t('SwUpdate.UpdateAvailableTitle')),
						content: this.translateService.instant(t('SwUpdate.UpdateAvailableContent')),
						submitButton: this.translateService.instant(t('Dialog.Ok')),
					},
				})
				dialogRef
					.afterClosed()
					.pipe(
						switchMap(() => this.update()),
						first()
					)
					.subscribe()
			})
		)
	}

	private update(): Observable<boolean> {
		return from(this.updates.activateUpdate()).pipe(tap(() => document.location.reload()))
	}
}
