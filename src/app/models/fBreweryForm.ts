import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fBreweryForm() {
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
    completeAddress: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    idCountry: new FormControl(null, [Validators.required]),
  });
}
