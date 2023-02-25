import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {UserCredential} from '@firebase/auth';

import {auth} from '../firebase';

class FirebaseService {
  static register(email: string, password: string): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => resolve(userCredential))
        .catch(error => reject(error));
    });
  }

  static login(email: string, password: string): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => resolve(userCredential))
        .catch(error => reject(error));
    });
  }

  static logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      return signOut(auth)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }

  static getCurrentUser() {
    return auth.currentUser;
  }
}

export default FirebaseService;
