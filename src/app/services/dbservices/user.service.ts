import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MtgUser } from 'src/app/classes/mtg-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../authservices/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection = 'users';
  constructor(private firestore: AngularFirestore, private authenticationService: AuthenticationService) { }

  /* Neuer Benutzer wird nach Registrierung hinzugefügt. */
  addUser(email: string, password: string) {
    this.authenticationService.signup(email, password).then(u => {
      this.firestore.collection(this.userCollection).doc(u.user.uid).set({
        email: email,
        language: 'english'
      });
    });
  }

  public getUserDoc() {
    return this.firestore.collection(this.userCollection).doc(this.authenticationService.currentUserId);
  }

  /* Benutzer kann ausgelesen werden um Attribute zu lesen. */
  public getUser() {
    return this.getUserDoc().get().toPromise();
  }

  /* Die gewünschte Sprache des Benutzers wird ausgelesen. */
  public updateUserLanguage(language: string) {
    return this.getUserDoc().update({ language: language});
  }


}

