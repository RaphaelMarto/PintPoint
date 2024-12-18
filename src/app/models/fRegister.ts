import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidator } from "../pages/auth/validator/passwordMatchValidator";

export function fRegisterForm() {
  return new FormGroup(
    {
      FirstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      NickName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', []),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      PictureUrl: new FormControl(''),
      PolicyCheck: new FormControl(true, [Validators.required]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      DateOfBirth: new FormControl<Date | string | null>(null, [Validators.required]),
      Street: new FormControl('', [Validators.required]),
      IdCity: new FormControl(null, [Validators.required]),
      HouseNumber: new FormControl('', [Validators.required]),
      PostCode: new FormControl('', [Validators.required]),
      AddressId: new FormControl(0, [Validators.required]),
    },
    { validators: [passwordMatchValidator] }
  );
}