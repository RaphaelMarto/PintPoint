import { Component, inject, OnInit } from '@angular/core';
import { fPasswordForm } from '../../../../models/fPasswordForm';
import { AuthService } from '../../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.scss'
})
export class ResetPwdComponent {
  resetPwdForm = fPasswordForm();
  private auth = inject(AuthService);
  private ActiveRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  code : string = '';
  id : number = 0;

  ngOnInit() {
    const code = this.ActiveRoute.snapshot.queryParams['code'];
    const id = this.ActiveRoute.snapshot.queryParams['id'];
    if (!(code && id)) {
      this.router.navigate(['/Home']);
    }
    this.code = code;
    this.id = id;
  }

  onSubmit() {
    if (this.resetPwdForm.valid) {
      this.auth.updatePasswordByCode(this.code, this.resetPwdForm.get('Password')!.value!, this.id).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Mot de passe modifié avec success', life: 3000 });
          this.router.navigate(['/Home']);
        },
        error: (err: any) => console.log(err),
      });
    }
  }
}