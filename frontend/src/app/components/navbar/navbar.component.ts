import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../directives/role.directive';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RoleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  activeLink: string = 'tasks';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to route changes and update active link
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects.split('/')[1]; // Extract first segment of route
      }
    });
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  logout(): void {
    localStorage.removeItem('userToken'); // Remove token
    localStorage.removeItem('user'); // Remove user data
    this.router.navigate(['/login']); // Navigate to login page
  }
}
