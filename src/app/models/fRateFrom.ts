import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fRateForm() {
  return new FormGroup({
    Rate: new FormControl('', [Validators.required]),
    Comment: new FormControl(''),
  });
}
