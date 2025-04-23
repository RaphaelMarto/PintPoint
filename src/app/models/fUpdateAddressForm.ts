import { FormControl, FormGroup, Validators } from "@angular/forms";

export function fUpdateAddressForm() {
  return new FormGroup(
    {
      street: new FormControl({value:'', disabled: true}, [
        Validators.required
      ]),
      houseNumber: new FormControl({value:'', disabled: true}, [
        Validators.required
      ]),
      postCode: new FormControl({value:'', disabled: true}, [
        Validators.required
      ]),
      idCity: new FormControl({value:0, disabled: true}, [Validators.required]),
    }
  );
}