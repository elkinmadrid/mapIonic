import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Coordenadas } from '../models/coordenadas';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  public createCoordenadas(coordenadas: Coordenadas) {
    this.firestore.collection('coordenadas').doc(coordenadas.uidUser).set({
      lng: coordenadas.lon,
      lat: coordenadas.lat,
      date: new Date()
    });
  }

  public getAllCoordenadas()  {
    return this.firestore.collection('coordenadas');

  }
  // Obtiene las coordenadas de un usuario
  public getUserCoordenadas(documentId: string) {
    return this.firestore.collection('coordenadas').doc(documentId);
  }

  // Actualiza un coordenadas
  public updateCoordenadas(documentId: string, data: any) {
    return this.firestore.collection('coordenadas').doc(documentId).set(data);
  }
}
