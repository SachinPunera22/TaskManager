import { AbstractControl } from '@angular/forms';

export function formIsInvalid(control: AbstractControl | null, ...errors: string[]): boolean {
    if (!control) {
        return false;
    }
    return (errors.some((error) => control.hasError(error)) && control.dirty &&control.touched);
}

export function formIsValid(control: AbstractControl | null): boolean {
    return control?.valid || false;
}
