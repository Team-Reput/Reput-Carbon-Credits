import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private notificationSubject = new BehaviorSubject<{ message: string,type: 'success' | 'error', show: boolean }>({ message: '',type: 'success', show: false });
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationSubject.next({ message,type, show: true });

    // Hide after 3 seconds
    setTimeout(() => {
      this.notificationSubject.next({ message: '',type, show: false });
    }, 3000);
  }
}
