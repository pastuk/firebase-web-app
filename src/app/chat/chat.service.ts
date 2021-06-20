import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public db: AngularFireDatabase) {
    this.db.database.goOnline();
  }
}
