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

  /* Benutzer kann ausgelesen werden um Attribute zu lesen. */
  getUser() {
    return this.firestore.collection(this.userCollection).doc(this.authentication.auth.currentUser.uid).get().toPromise();
  }

  /* Die gewünschte Sprache des Benutzers wird ausgelesen. */
  updateUserLanguage(language: string) {
    this.firestore.collection(this.userCollection).doc(this.authentication.auth.currentUser.uid).update({ language: language});
  }

  
}

