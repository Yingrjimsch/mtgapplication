import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserService } from "../dbservices/user.service";
import { User } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  user: User = null; // TODO if ctrl + F5 the first time it won't be recognized. How to solve that problem is still unclear.
  constructor(
    private storage: Storage,
    private plt: Platform,
    private authentication: AngularFireAuth,
    private router: Router
  ) {
    authentication.authState.subscribe(user => (this.user = user));
    //this.plt.ready().then(() => this.checkUser());
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.user.uid : "";
  }

  // NEEDED! CONTROL IF IT WORKS CORRECTLY FROM TIME TO TIME!!
  /*public checkUser() { 
    this.authentication.authState.subscribe(user => {
      if (user) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }
  */

  async login(email: string, password: string) {
    return this.authentication.auth
      .signInWithEmailAndPassword(email, password)
      .then(credentials => {
        this.router.navigate(["/home"]);
        this.authenticationState.next(true);
      });
  }

  logout() {
    this.authentication.auth.signOut().then(() => {
      this.router.navigate(["/home"]);
      this.authenticationState.next(false);
    });
  }

  signup(email: string, password: string) {
    return this.authentication.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    /*
    this.authentication.auth.createUserWithEmailAndPassword(email, password).then(data => {
      this.userService.addUser(data.user.uid, data.user.email);
      console.log(this.authentication.auth.currentUser);
      this.router.navigate(['/home']);
      this.authenticationState.next(true);
    });
    */
  }
  /*
  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }
  */
}
