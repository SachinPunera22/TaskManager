

import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormControl} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {JsonPipe, NgClass, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf,MatFormFieldModule,MatProgressSpinnerModule,MatInputModule,MatCardModule,NgClass,RouterLink ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMsg!:string|null;
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    });
  }

  get f(): { [key: string]: FormControl } {
    return this.registerForm.controls as { [key: string]: FormControl };
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMsg=null;
    console.log('this.registerForm:',this.registerForm.value)
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const userData = this.registerForm.value;
    this.authService.register(userData).subscribe({
      next: (res) => {
        console.log(res);
        const token = res.data.token;
        localStorage.setItem('userToken', token);
        // Form is valid, proceed with registration
        console.log('Registration successful', this.registerForm.value);

        // Reset the form after successful submission
        this.registerForm.reset();

        this.isLoading = false;

          this.router.navigate(['/tasks']);
      },
      error: ({error}) => {
        console.log('err:',error);
        this.errorMsg=error?.message
        this.isLoading = false;
      }
    });

  }
}
