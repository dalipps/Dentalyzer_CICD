import { AfterViewInit, Component, Injector } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs'
import { distinctUntilChanged, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators'
import { LoadingService } from '../services/loading/loading.service'
import { Destroy } from './destroy'

@Component({
	template: '',
})
export abstract class BaseComponent extends Destroy implements AfterViewInit {
	private loadingService: LoadingService
	private afterViewInitSubject$ = new BehaviorSubject(false)
	translateService: TranslateService

	isLoading$: Observable<boolean>
	afterViewInit$ = this.afterViewInitSubject$.asObservable()

	constructor(injector: Injector) {
		super()

		this.loadingService = injector.get(LoadingService)
		this.translateService = injector.get(TranslateService)
		this.isLoading$ = this.loadingService.isLoading$
	}

	ngAfterViewInit(): void {
		this.afterViewInitSubject$.next(true)
	}

	startLoading(): MonoTypeOperatorFunction<unknown> {
		return tap(() => this.loadingService.startLoading())
	}

	endLoading(): MonoTypeOperatorFunction<unknown> {
		return finalize(() => this.loadingService.endLoading())
	}

	// TODO: Refactor unkown
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
