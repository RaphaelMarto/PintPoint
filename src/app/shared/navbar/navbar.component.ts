import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../pages/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showLogin: boolean = false;
  connected: boolean = false;

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.isConnectedSubject.subscribe({
      next: (data: boolean) => (this.connected = data),
    });
    this.authService.emitIsConnected();
    this.authService.isShownedSubject.subscribe({
      next: (data: boolean) => (this.showLogin = data),
    });
  }

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: 'Home',
    },
    {
      label: 'Classement',
      icon: 'pi pi-book',
      routerLink: 'Pages/BeerRanking',
    },
  ];

  ShowLog(): void {
    this.authService.emitIsShowned();
  }

  logout() {
    this.authService.logout();
  }
}
