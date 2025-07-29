import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fEmailForm() {
    return new FormGroup({
        Email: new FormControl('', [
            Validators.required,
        ]),
    },);
}
