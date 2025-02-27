import { FormGroup } from "@angular/forms";

export function confirmPassword(group: FormGroup) {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    } else {
      rePassword?.setErrors(null);
    }
  }