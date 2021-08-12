import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public afAuth: AngularFireAuth,
  ) { }


  async googleAuth() {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return result;
    } catch (error) {

      throw Error(error);
    }
  }

  async authWithEmailAndPass(email: string, pass: string) {
    try {
      const response = await this.afAuth.createUserWithEmailAndPassword(email, pass);
      return response;
    } catch (error) {
      if (error.code.includes('auth/email')) {
          const res = await this.afAuth.signInWithEmailAndPassword(email, pass);
          return res;
      }
      throw Error(error);
    }
  }
}
