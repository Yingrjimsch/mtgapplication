import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Settings } from '../../classes/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsCollection: string = 'settings';
  constructor(private firestore: AngularFirestore) { }

  getLanguage() {
    return this.firestore.collection(this.settingsCollection).get().toPromise();
  }

  setLanguage(l: string) {
    this.firestore.collection(this.settingsCollection).doc('language').update({
      language: l
    })
  }
}
