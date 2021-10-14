import { Validators as AngularValidators, AbstractControl, ValidationErrors } from '@angular/forms';

export class Validators extends AngularValidators {

  static required(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !/\S/.test(control.value)) {
      return { 'required': true };
    }
    return null;
  }

}
