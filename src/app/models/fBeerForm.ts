import { FormControl, FormGroup, Validators } from '@angular/forms';

export function fBeerAddForm() {
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    pictureUrl: new FormControl(''),
    description: new FormControl(''),
    alcoholPercent: new FormControl(null, [Validators.required]),
    idBeerType: new FormControl(null, [Validators.required]),
    idBrewery: new FormControl(null, [Validators.required]),
    capacity: new FormControl(null, [Validators.required]),
    rating: new FormControl(0, [Validators.required]),
    createdAt: new FormControl(new Date(Date.now()).toISOString(), [
      Validators.required,
    ]),
    updatedAt: new FormControl(new Date(Date.now()).toISOString(), [
      Validators.required,
    ]),
  });
}
