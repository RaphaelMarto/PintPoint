import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fRateForm() {
  return new FormGroup({
    Rate: new FormControl<number | null>(null, [Validators.required]),
    Comment: new FormControl(''),
  });
}
