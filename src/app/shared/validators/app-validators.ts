import {
  Validators as NGValidators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export class AppValidators extends NGValidators {
  static override minLength(length): any {
    return (control: any) =>
      super.minLength(length)(control)
        ? { minLength: 'Field length can not be less than ' + length }
        : undefined;
  }

  static override maxLength(length): any {
    return (control) =>
      super.maxLength(length)(control)
        ? { maxLength: 'Field length can not be more than ' + length }
        : undefined;
  }

  static override required(control): any {
    return super.required(control)
      ? { required: 'The field is required' }
      : undefined;
  }

  // static override pattern(pattern: string | RegExp, patternDescription?: string): any {
  //   return (control: AbstractControl) => {
  //     if (super.pattern(pattern)(control)) {
  //       return {
  //         minLength: `Please follow the template '${patternDescription || pattern.toString()}'`
  //       };
  //     }
  //   };
  // };

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    return (control.value as string)?.indexOf(' ') !== -1
      ? { cannotContainSpace: 'Spaces are not allowed' }
      : undefined;
  }

  static minNumber(control: AbstractControl): ValidationErrors | null {
    return (control.value as number) < 1
      ? { minValue: 'Please enter at least 1' }
      : undefined;
  }

  static override email(control: AbstractControl) {
    return super.email(control)
      ? { required: 'Please enter the correct email' }
      : undefined;
  }

  static matchValues(
    matchTo: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? undefined
        : { isMatching: 'Passwords do not match' };
    };
  }
}
