import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(private authService: AuthService) {}

  showState: boolean = false;
  ShowDelete() {
    this.showState = true;
  }

  HideDelete() {
    this.showState = false;
  }
  deleteAccount() {
    this.authService.deleteUser().subscribe({
      next: (res) => {
        this.authService.logout();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
