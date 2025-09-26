import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastMessage } from '../../models/toast-message-model';
import { ToastService } from '../../services/toast-service';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-toast-container-component',
  imports: [CommonModule, TranslateDirective],
  templateUrl: './toast-container-component.html',
})
export class ToastContainerComponent {
  toasts: ToastMessage[] = [];

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
      this.cdr.markForCheck();
    });
  }

  remove(id: number) {
    this.toastService.remove(id);
  }
}
