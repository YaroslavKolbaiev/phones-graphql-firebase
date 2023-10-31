import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA4rveHnJvcdP42BkDm9W29i9Xpm0_RrrU',
  authDomain: 'phone-catalogue-61634.firebaseapp.com',
  projectId: 'phone-catalogue-61634',
  storageBucket: 'phone-catalogue-61634.appspot.com',
  messagingSenderId: '1046161166956',
  appId: '1:1046161166956:web:87fdeced1bb1ff99b73e49',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
