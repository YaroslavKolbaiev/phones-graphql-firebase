import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './FireBaseConfig';

const registerUser = (
  email: string,
  password: string,
) => createUserWithEmailAndPassword(auth, email, password);

const loginUser = (
  email: string,
  password: string,
) => signInWithEmailAndPassword(auth, email, password);

const logOutUser = () => auth.signOut();

const logInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (
  handleAuthChanges: (value: User | null) => void,
) => {
  onAuthStateChanged(auth, (user) => {
    handleAuthChanges(user);
  });
};

const resetPassword = (email: string) => {
  sendPasswordResetEmail(auth, email);
};

export const FirebaseAuthService = {
  registerUser,
  loginUser,
  logOutUser,
  resetPassword,
  logInWithGoogle,
  subscribeToAuthChanges,
};
