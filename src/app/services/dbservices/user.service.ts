import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MtgUser } from 'src/app/classes/mtg-user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection = 'users';
  constructor(private firestore: AngularFirestore, private authentication: AngularFireAuth) { }

  /* Neuer Benutzer wird nach Registrierung hinzugefügt. */
  addUser(id: string, email: string) {
    this.firestore.collection(this.userCollection).doc(id).set({
      email: email,
      language: 'english'
    }).then(() => this.getUser().then(u => console.log(u.data())));
    
  }

  public getUserDoc() {
    return this.firestore.collection(this.userCollection).doc(this.authentication.auth.currentUser.uid);
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

