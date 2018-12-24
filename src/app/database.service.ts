import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AlertService } from '../app/alert.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // TODO: dbPath hinzufügen
  private dbPath = 'addHereExistingDBPath';

  databaseRef: AngularFireList<string> = null;

  constructor(private db: AngularFireDatabase, private alert: AlertService) {
    this.databaseRef = db.list(this.dbPath);
  }

  // Should not be needed
  createItem(item: string): void {
    this.databaseRef.push(item);
  }

  updateItem(key: string, value: any): void {
    this.databaseRef
      .update(key, value)
      .catch(err => this.handleError(err));
  }

  deleteItem(key: string): void {
    this.databaseRef.remove(key).catch(err => this.handleError(err));
  }

  getItemsList(): AngularFireList<string> {
    return this.databaseRef;
  }

  deleteAll(): void {
    this.databaseRef.remove().catch(err => this.handleError(err));
  }

  private handleError(err) {
    this.alert.showAlert(err);
  }
}
