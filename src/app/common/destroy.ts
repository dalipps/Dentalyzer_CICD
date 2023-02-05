import { Injectable, OnDestroy } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable()
export abstract class Destroy implements OnDestroy {
	private _destroy$: Subject<boolean> = new Subject<boolean>()
	destroy$: Observable<boolean> = this._destroy$.asObservable()

	ngOnDestroy(): void {
		this._destroy$.next(true)
		this._destroy$.unsubscribe()
	}
}
