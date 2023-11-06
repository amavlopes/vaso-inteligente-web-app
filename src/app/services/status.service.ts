import { Injectable } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistroLuminosidade } from '../models/registro-luminosidade';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private registrosLuminosidade$ = new BehaviorSubject([]);
  private temperatura$ = new BehaviorSubject(null);
  private umidadeAr$ = new BehaviorSubject(null);
  private umidadeSolo$ = new BehaviorSubject(null);

  constructor(private database: Database) { }

  get registrosLuminosidade(): Observable<RegistroLuminosidade[] | []> {
    return this.registrosLuminosidade$.asObservable();
  }

  get temperatura(): Observable<number | null> {
    return this.temperatura$.asObservable();
  }

  get umidadeAr(): Observable<number | null> {
    return this.umidadeAr$.asObservable();
  }

  get umidadeSolo(): Observable<number | null> {
    return this.umidadeSolo$.asObservable();
  }

  observarLeituraDosSensores(): any {

    onValue(ref(this.database, '/sensores/registros_luminosidade'), (snapshot) => {
      this.registrosLuminosidade$.next(snapshot.val());
    });

    onValue(ref(this.database, '/sensores/temperatura'), (snapshot) => {
      this.temperatura$.next(snapshot.val());
    });

    onValue(ref(this.database, '/sensores/umidade_ar'), (snapshot) => {
      this.umidadeAr$.next(snapshot.val());
    });

    onValue(ref(this.database, '/sensores/umidade_solo'), (snapshot) => {
      this.umidadeSolo$.next(snapshot.val());
    });
  }

}
