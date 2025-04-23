import { FormControl, FormGroup, Validators } from "@angular/forms";

export function fUpdateProfileForm() {
  return new FormGroup(
    {
      firstName: new FormControl({value:'', disabled: true}, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl({value:'', disabled: true}, [
        Validators.required,
        Validators.minLength(2),
      ]),
      nickName: new FormControl({value:'', disabled: true}, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      email: new FormControl({value:'', disabled: true}, [Validators.required, Validators.email]),
      phone: new FormControl({value:'', disabled: true}, []),
      dateOfBirth: new FormControl<Date | string | null>({value:null, disabled: true}, [Validators.required]),
    }
  );
}