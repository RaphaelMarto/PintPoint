import { Component } from '@angular/core';
import { UserCompleteInfo } from '../../../../interface/IUserCompleteInfo';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { fRegisterForm } from '../../../../models/fRegister';
import { City } from '../../../../interface/iCity';
import { CountryService } from '../../../service/country.service';
import { LoginResponse } from '../../../../interface/iloginResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = fRegisterForm();
  submit: boolean = false;
  cities: City[] = [];
  today = new Date();

  // ajouter policyCheck 
  constructor(
    private authService: AuthService,
    private router: Router,
    private coutryService: CountryService
  ) {}
  ngOnInit(): void {
    this.loadCity();
  }

  loadCity() {
    this.coutryService.getCity().subscribe({
      next: (data: City[]) => (this.cities = data),
      error: (err: any) => console.log(err),
    });
  }

  onSubmit(): void {
    this.submit = true;

    if (this.registerForm.valid) {
      const selectedDateString: string | null = this.registerForm.get(
        'DateOfBirth'
      )?.value as string;

      if (selectedDateString) {
        const selectedDate: Date = new Date(selectedDateString);
        const formattedDate: string = selectedDate.toISOString();
        this.registerForm.get('DateOfBirth')?.setValue(formattedDate);
      }

      let data = this.registerForm.value;
      delete data.confirmPassword;

      this.authService.register(data as UserCompleteInfo).subscribe({
        next: (res: LoginResponse) => {
          localStorage.setItem('isconnected', JSON.stringify(true));
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.authService.emitIsConnected();
          this.router.navigate(['Home']);
        },
        error: (error) => {
          console.error('register error:', error);
        },
      });
    }
  }
}
