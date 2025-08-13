import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fBeerPutForm() {
  return new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    pictureUrl: new FormControl(''),
    description: new FormControl(''),
    alcoholPercent: new FormControl(null, [Validators.required]),
    idBeerType: new FormControl(null, [Validators.required]),
    idBrewery: new FormControl(null, [Validators.required]),
    capacity: new FormControl(null, [Validators.required]),
    birthYear: new FormControl<number | null>(null, [Validators.required]),
  });
}
