import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isLoading$ = new BehaviorSubject<{ key: string; state: boolean }>({
    key: ' ',
    state: false,
  });

  constructor(private notifier: NotifierService) {}

  errorHandler(error: any) {
    if (error.error.errors == null) {
      this.notifier.notify('error', error.error);
      return;
    }
    var errors = error.error.errors;
    Object.keys(errors).forEach((key) => {
      (errors[key] as Array<any>).forEach((element: any) => {
        this.notifier.notify('error', element);
      });
    });
  }

  setLoading(key: string, state: boolean) {
    this.isLoading$.next({ key, state });
  }

  SetLocal(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  GetLocal(key: string) {
    var dataJson = localStorage.getItem(key);
    if (!dataJson) return null;
    var data = JSON.parse(dataJson);
    return data;
  }
}
