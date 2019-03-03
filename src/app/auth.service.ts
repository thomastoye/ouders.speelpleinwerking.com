import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  login(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  sendPasswordReset(email: string): Promise<void> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
