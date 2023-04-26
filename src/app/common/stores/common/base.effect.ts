import { inject } from '@angular/core'
import { BaseService } from '@dentalyzer/base'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'

export abstract class BaseEffects<TStoreType> extends BaseService {
	protected readonly actions$: Actions = inject(Actions)
	protected readonly store$: Store<TStoreType> = inject(Store<TStoreType>)

	protected constructor() {
		super()
	}
}
