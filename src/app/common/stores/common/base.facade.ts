import { inject } from '@angular/core'
import { BaseService } from '@dentalyzer/base'
import { Action, Store } from '@ngrx/store'
import { Observable, filter, first, tap } from 'rxjs'

export abstract class BaseFacade<TStoreType> extends BaseService {
	protected readonly store: Store<TStoreType> = inject(Store<TStoreType>)
	abstract initialized$: Observable<boolean>
	protected initialized = false

	protected constructor() {
		super()
	}

	protected initialize(): void {
		this.initialized$
			.pipe(
				filter((x) => x),
				first(),
				tap((x) => (this.initialized = x))
			)
			.subscribe()
	}

	protected initStore(action: Action): void {
		if (this.initialized) return
		this.store.dispatch(action)
	}

	protected dispatch(action: Action): void {
		if (this.initialized) {
			this.store.dispatch(action)
		} else {
			this.initialized$
				.pipe(
					filter((x) => !x),
					first(),
					tap(() => this.store.dispatch(action))
				)
				.subscribe()
		}
	}
}
