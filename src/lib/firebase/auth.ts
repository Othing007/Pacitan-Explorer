import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from './config';

export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signOutUser = () => {
  return signOut(auth);
};
