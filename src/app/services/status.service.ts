import { Injectable } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private registros$ = new BehaviorSubject([]);

  constructor(private database: Database) { }

  get registros(): Observable<Registro[] | []> {
    return this.registros$.asObservable();
  }

  observarLeituraDosSensores(): any {

    onValue(ref(this.database, 'sensores/registros'), (snapshot) => {
      this.registros$.next(snapshot.val());
    });

  }

}
