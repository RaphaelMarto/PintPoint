import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../pages/auth/validator/passwordMatchValidator';

export function fpasswordReset() {
    return new FormGroup({
        oldPassword: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordMatchValidator] });
}
