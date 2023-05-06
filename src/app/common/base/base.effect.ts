import { inject } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { BaseService } from './base.service'

export abstract class BaseEffects<TStoreType> extends BaseService {
	protected readonly actions$: Actions = inject(Actions)
	protected readonly store$: Store<TStoreType> = inject(Store<TStoreType>)

	protected constructor() {
		super()
	}
}
