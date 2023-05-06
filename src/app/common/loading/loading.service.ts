import { Injectable } from '@angular/core'
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs'
import { finalize, tap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	private internalLoadingSubject = new BehaviorSubject<boolean>(false)
	private counter = 0

	isLoading$: Observable<boolean>

	constructor() {
		this.isLoading$ = this.internalLoadingSubject.asObservable()
	}

	startLoading<T>(): MonoTypeOperatorFunction<T> {
		return tap<T>(() => this.start())
	}

	endLoading<T>(): MonoTypeOperatorFunction<T> {
		return finalize<T>(() => this.end())
	}

	start(): void {
		this.counter++
		if (this.internalLoadingSubject.value === false) {
			this.internalLoadingSubject.next(true)
		}
	}

	end(): void {
		this.counter--
		if (this.counter <= 0) {
			this.counter = 0
			this.internalLoadingSubject.next(false)
		}
	}
}
