import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../dbservices/user.service';
import { User } from 'firebase';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;

  constructor(
    private storage: Storage,
    private plt: Platform,
    private authentication: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.authentication.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  get currentUser(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.isLoggedIn ? user : null;
  }

  get currentUserId(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.isLoggedIn ? user.uid : '';
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  async login(email: string, password: string) {
    return this.authentication.auth
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        this.ngZone.run(() => this.router.navigate(['/home']));
      });
  }

  logout() {
    this.authentication.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    });
  }

  signup(email: string, password: string) {
    return this.authentication.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }
}
