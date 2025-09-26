import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastLevel, ToastMessage } from '../models/toast-message-model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private counter = 0;

  show(message: string, level: ToastLevel = 'success', duration = 3000) {
    const id = this.counter++;
    const toast: ToastMessage = { message, level, id };

    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToasts, toast]);
    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number) {
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next(currentToasts.filter((t) => t.id !== id));
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  danger(message: string, duration?: number) {
    this.show(message, 'danger', duration);
  }
}
