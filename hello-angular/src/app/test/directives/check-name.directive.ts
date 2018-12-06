// import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

// @Directive({
//   selector: '[appCheckName]',
//   providers: [{provide: NG_VALIDATORS, useExisting: CheckNameDirective, multi: true}]
// })
// export class CheckNameDirective implements Validator{

//   @Input('appCheckName') forbiddenName: string;

//   constructor() { }

//   validate(control: AbstractControl): {[key: string]: any} {
//     return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control) : null;
//   }
// }

// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
//   };
// }