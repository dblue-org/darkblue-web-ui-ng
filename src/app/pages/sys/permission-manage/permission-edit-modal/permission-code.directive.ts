import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function permissionCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.startsWith('ROLE_')) {
      return {'notStartWithRole': {value: control.value}};
    }
    return null;
  };
}
