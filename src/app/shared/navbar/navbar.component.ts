import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../pages/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  showLogin: boolean = false;
  connected: boolean = false;
  nickname: string = '';
  itemsPopUp: MenuItem[] = [];

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.isConnectedSubject.subscribe({
      next: (data: boolean) => {
        this.connected = data;
        this.nickname = this.authService.getNickname();
        this.itemsPopUp = [
          {
            label: 'Profil',
            icon: 'pi pi-user',
            routerLink: 'Pages/Profil/' + this.nickname,
          },
          {
            label: 'Paramètres',
            icon: 'pi pi-cog',
            routerLink: 'Pages/Profil/Parameters/' + this.nickname,
          },
          {
            label: 'Déconnexion',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ];
      },
    });

    this.authService.isShownedSubject.subscribe({
      next: (data: boolean) => (this.showLogin = data),
    });

    this.authService.emitIsConnected();
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

  ShowLogin(): void {
    this.authService.emitIsShowned();
  }

  logout() {
    this.authService.logout();
  }
}
