import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root' // You can also provide it in a specific module if needed
})
export class SidenavService {
  refreshSidenav = new EventEmitter<void>(); // EventEmitter to notify when the sidenav should be refreshed

  constructor() {}

  notifySidenavRefresh() {
    this.refreshSidenav.emit(); // Emit the refresh event
  }
}
