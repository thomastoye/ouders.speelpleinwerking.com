import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  isLoggedIn$(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map(user => !!user));
  }

  login(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, displayName: string): Promise<void> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      return user.user.updateProfile({ displayName });
    });
  }

  sendPasswordReset(email: string): Promise<void> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }
}
