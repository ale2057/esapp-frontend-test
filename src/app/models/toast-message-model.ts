export type ToastLevel = 'success' | 'warning' | 'danger';

export interface ToastMessage {
  message: string;
  level: ToastLevel;
  id: number;
}
