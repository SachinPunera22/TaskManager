import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {formIsInvalid, formIsValid} from '../../shared/utils/form-utils';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FromBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  loginErrorMsg: string = "";
  loginSuccess: boolean = false;
  isLoading: boolean = false;

  loginForm: FormGroup = this._FromBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.isLoading = true;
      this._AuthService.login(userData).subscribe({
        next: (res) => {
          this.loginSuccess = true;
          const token = res.data.token;
          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.isLoading = false;

        },
        error: (err) => {
          console.log(err);
          this.loginErrorMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }

  formIsInvalid = formIsInvalid;
  formIsValid = formIsValid;
}
