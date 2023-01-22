import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService extends BaseService {
  private internalLoadingSubject = new BehaviorSubject<boolean>(false);
  private counter = 0;

  isLoading$: Observable<boolean>;

  constructor() {
    super();
    this.isLoading$ = this.internalLoadingSubject.asObservable();
  }

  startLoading<T>(): MonoTypeOperatorFunction<T> {
    return tap<T>(() => this.start());
  }

  endLoading<T>(): MonoTypeOperatorFunction<T> {
    return finalize<T>(() => this.end());
  }

  start(): void {
    this.counter++;
    if (this.internalLoadingSubject.value === false) {
      this.internalLoadingSubject.next(true);
    }
  }

  end(): void {
    this.counter--;
    if (this.counter <= 0) {
      this.counter = 0;
      this.internalLoadingSubject.next(false);
    }
  }
}
