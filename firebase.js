// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCazWDaXwSmMuIpKH1ZKXKt2AuwTFQi5oc',
  authDomain: 'mdev1015-assignment1.firebaseapp.com',
  projectId: 'mdev1015-assignment1',
  storageBucket: 'mdev1015-assignment1.appspot.com',
  messagingSenderId: '217555118846',
  appId: '1:217555118846:web:584d6ee9b3d1d2f67213af',
};

// Initialize Firebase
let firebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const auth = getAuth(firebaseApp);

export {auth};
