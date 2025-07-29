import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
  constructor(private authService: AuthService, private ActivatedRoute: ActivatedRoute) {


  }
  emailConfirmed = "pending";
  ngOnInit() {
    const id = this.ActivatedRoute.snapshot.queryParams['id'];
    const code = this.ActivatedRoute.snapshot.queryParams['code'];
    setTimeout(() => {
      this.authService.verifyEmail(code, id).subscribe({
        next: (response) => {
          this.emailConfirmed = "ok";
        },
        error: (err: any) => { this.emailConfirmed = "ko"; console.log(err) },
      });
    }, 2000);
  }
}
