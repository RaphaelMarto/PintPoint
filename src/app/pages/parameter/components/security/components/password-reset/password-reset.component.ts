import { Component } from '@angular/core';
import { fpasswordReset } from '../../../../../../models/fpassword-reset';
import { AuthService } from '../../../../../service/auth.service';
import { UpdatePassword } from '../../../../../../interface/iUpdatePassword';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  passwordResetForm = fpasswordReset();
  onSubmit() {
    if (this.passwordResetForm.invalid) return;
    this.authService.updatePassword(this.passwordResetForm.value as UpdatePassword).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Mot de passe modifié avec success', life: 3000 });
        this.router.navigate(['Pages/Profil/Parameters/'+ this.authService.getNickname()]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
