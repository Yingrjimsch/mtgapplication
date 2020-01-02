import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, private router: Router, private authentication: AngularFireAuth) { }

  /*canActivate(): boolean {
    console.log('isauth');
    console.log(this.auth.isAuthenticated());
    return this.authentication.authState.toPromise().then(user => {
      if(user) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    });
    /*const isAuthenticated = this.auth.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
    */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.authenticated) { return true; }

    console.log('access denied!')
    this.router.navigate(['/login']);
    return false;
  }
}
