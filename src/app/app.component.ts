import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SalesTrax';
  constructor(private router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login' ||this.router.url === '/' || this.router.url.startsWith('/reset-password');
  }
}