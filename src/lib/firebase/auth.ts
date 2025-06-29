import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from './config';

const throwAuthError = () => {
    throw new Error("Firebase is not configured. Please add your Firebase credentials to the .env file.");
}

export const signUpWithEmailAndPassword = (email: string, password: string) => {
  if (!auth) return throwAuthError();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  if (!auth) return throwAuthError();
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
    if (!auth) return throwAuthError();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signOutUser = () => {
  if (!auth) return throwAuthError();
  return signOut(auth);
};
