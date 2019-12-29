import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';
import { UserService } from '../dbservices/user.service';
import { MtgUser } from 'src/app/classes/mtg-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private authentication: AngularFireAuth, private router: Router, private userService: UserService) {
    this.plt.ready().then(() => this.checkUser());
  }

  // NEEDED?
  checkUser() {
    this.authentication.auth.onAuthStateChanged(user => {
      if (user) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }

  async login(email: string, password: string) {
    return this.authentication.auth.signInWithEmailAndPassword(email, password).then(credentials => {
      this.router.navigate(['/home']);
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.authentication.auth.signOut().then(() => {
      this.router.navigate(['/home']);
      this.authenticationState.next(false);
    });
  }

  signup(email: string, password: string) {
    this.authentication.auth.createUserWithEmailAndPassword(email, password).then(data => {
      this.userService.addUser(data.user.uid, data.user.email);
      console.log(this.authentication.auth.currentUser);
      this.router.navigate(['/home']);
      this.authenticationState.next(true);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }
}
