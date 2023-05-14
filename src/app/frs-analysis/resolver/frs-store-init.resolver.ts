import { inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ResolveFn, Router } from '@angular/router'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'
import { EMPTY, catchError, distinctUntilChanged, filter, throwError, timeout } from 'rxjs'
import { FrsFacade } from '../store'

export const frsStoreInitResolver: ResolveFn<boolean> = () => {
	const frsFacade = inject(FrsFacade)
	const snackbar = inject(MatSnackBar)
	const router = inject(Router)
	const translateService = inject(TranslateService)

	return frsFacade.initialized$.pipe(
		timeout({
			each: 6_000,
			with: () => throwError(() => new Error(translateService.instant(t('FrsStoreInitResolver.Timeout')))),
		}),
		distinctUntilChanged(),
		filter((initialized: boolean) => initialized),
		catchError((err: Error) => {
			snackbar.open(err.message)
			router.navigateByUrl('')
			return EMPTY
		})
	)
}
