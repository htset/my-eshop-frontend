import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordsMustMatchValidator: ValidatorFn = 
    (control: AbstractControl): ValidationErrors | null => {
        const p = control.get('password');
        const rp = control.get('confirmPassword');
    
        if (rp?.errors) {
            // return if another validator has already found an error on the matchingControl
            return null;
        }
        return p && rp && p.value !== rp.value ? { passwordsMustMatch: true } : null;
    }