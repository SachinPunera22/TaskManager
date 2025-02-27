import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone:true
})
export class RoleDirective implements OnInit {
  @Input('appRole') requiredRoles!: string[];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.role || !this.requiredRoles.includes(user.role)) {
      this.el.nativeElement.style.display = 'none'; // Hide element if role doesn't match
    }
  }
}
