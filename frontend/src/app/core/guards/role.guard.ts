import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // Fetch user details from AuthService

    if (user && user.role === 'Manager') {
      return true; // Allow navigation
    }

    this.router.navigate(['/tasks']); // Redirect non-managers to tasks
    return false;
  }
}
