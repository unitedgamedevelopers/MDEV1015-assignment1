import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {getApp} from 'firebase/app';

const auth = getAuth(getApp());

export function register(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

export function login(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

export function logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    return signOut(auth)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}
