import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fSignInForm() {
  return new FormGroup({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    RememberMe: new FormControl(false),
  });
}
