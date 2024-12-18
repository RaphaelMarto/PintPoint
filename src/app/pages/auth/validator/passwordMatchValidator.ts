import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('Password');
  const confirmPassword = control.get('confirmPassword');

  // Clear previous errors if passwords match before validation
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ 'passwordMatch': true });

    // Erreur sur le formulaire entier
    return { 'passwordMatch': true };
  }
  return null;
}