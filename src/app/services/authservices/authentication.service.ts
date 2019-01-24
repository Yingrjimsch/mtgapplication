import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private authentication: AngularFireAuth) {
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

  login(email: string, password: string) {
    this.authentication.auth.signInWithEmailAndPassword(email, password).then(credentials => {
      console.log(credentials.user);
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.authentication.auth.signOut().then(() => {
      this.authenticationState.next(false);
    });
  }

  signup(email: string, password: string) {
    this.authentication.auth.createUserWithEmailAndPassword(email, password).then(credentials => {
      console.log(credentials.user);
      this.authenticationState.next(true);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }
}
