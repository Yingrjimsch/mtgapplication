import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

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
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authenticationService.isLoggedIn !== true) {
      this.router.navigate(['login'])
    }
    return true;
  }
}
