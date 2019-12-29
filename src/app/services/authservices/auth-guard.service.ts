import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.auth.isAuthenticated();
    console.log(this.auth.isAuthenticated());
    console.log('Check if authenticated:')
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }
}
