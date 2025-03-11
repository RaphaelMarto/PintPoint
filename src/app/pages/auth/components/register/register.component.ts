import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { fRegisterForm } from '../../../../models/fRegister';
import { City } from '../../../../interface/iCity';
import { CountryService } from '../../../service/country.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LoginResponse } from '../../../../interface/iloginResponse';
import { UserCompleteInfo } from '../../../../interface/IUserCompleteInfo';

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
  nickNameExists: boolean = false;
  emailExists: boolean = false;

  // ajouter policyCheck 
  constructor(
    private authService: AuthService,
    private router: Router,
    private coutryService: CountryService
  ) {}
  ngOnInit(): void {
    this.loadCity();
    this.initEmailNickNameCheck();
  }

  loadCity() {
    this.coutryService.getCity().subscribe({
      next: (data: City[]) => (this.cities = data),
      error: (err: any) => console.log(err),
    });
  }

  initEmailNickNameCheck(){
    this.registerForm.get('NickName')!.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkUserExists("A", value as string);
      });

      this.registerForm.get('Email')!.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkUserExists(value as string, "A");
      });
  }

  
  checkUserExists(email: string, nickName:string):void {
    this.authService.checkExist(email, nickName).subscribe(response => {
      this.nickNameExists = response.nickNameExists;
      this.emailExists = response.emailExists;
    });
  }

  onSubmit(): void {
    this.submit = true;

    if (this.registerForm.valid && !this.nickNameExists && !this.emailExists) {
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
          localStorage.setItem('nickname', res.nickname);
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
