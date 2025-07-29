import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../pages/auth/validator/passwordMatchValidator';

export function fPasswordForm() {
    return new FormGroup({
        Password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
            Validators.required,
        ]),
    },
        { validators: [passwordMatchValidator] }
    );
}
