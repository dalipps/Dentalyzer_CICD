import { Injectable } from '@angular/core'
import { BehaviorSubject, fromEvent, map, merge, takeUntil, tap } from 'rxjs'
import { BaseService } from '../base'

@Injectable({
	providedIn: 'root',
})
export class NetworkService extends BaseService {
	private _isOnline$ = new BehaviorSubject<boolean>(this.isOnline)
	isOnline$ = this._isOnline$.asObservable()

	get isOnline(): boolean {
		return navigator.onLine
	}

	constructor() {
		super()

		merge(fromEvent(window, 'online'), fromEvent(window, 'offline'))
			.pipe(
				map(() => this.isOnline),
				takeUntil(this.destroy$),
				tap((x) => this._isOnline$.next(x))
			)
			.subscribe()
	}
}
