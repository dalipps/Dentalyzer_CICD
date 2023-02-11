import { Component, Injector } from '@angular/core'
import { MonoTypeOperatorFunction, Observable } from 'rxjs'
import { distinctUntilChanged, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Destroy } from './destroy'
import { TranslateService } from '@ngx-translate/core'
import { LoadingService } from './services/loading.service'

@Component({
	template: '',
})
export abstract class BaseComponent extends Destroy {
	private loadingService: LoadingService
	private translateService: TranslateService

	isLoading$: Observable<boolean>

	constructor(injector: Injector) {
		super()

		this.loadingService = injector.get(LoadingService)
		this.translateService = injector.get(TranslateService)
		this.isLoading$ = this.loadingService.isLoading$
	}

	startLoading(): MonoTypeOperatorFunction<unknown> {
		return tap(() => this.loadingService.startLoading())
	}

	endLoading(): MonoTypeOperatorFunction<unknown> {
		return finalize(() => this.loadingService.endLoading())
	}

	translateOnChange(key: string | string[], interpolationPrams?: unknown): Observable<unknown> {
		return this.translateService.onLangChange.pipe(
			startWith({}),
			switchMap(() =>
				this.translateService.get(
					key,
					interpolationPrams && typeof interpolationPrams === 'object' ? interpolationPrams : undefined
				)
			),
			takeUntil(this.destroy$),
			distinctUntilChanged()
		)
	}
}
