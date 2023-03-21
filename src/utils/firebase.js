import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBq_SX5zkxjpFLXtNtr2Qae_CdYWEElBFI",
    authDomain: "social-cool-f649d.firebaseapp.com",
    projectId: "social-cool-f649d",
    storageBucket: "social-cool-f649d.appspot.com",
    messagingSenderId: "84073906585",
    appId: "1:84073906585:web:feb3b77a5d1dfb9ef05308"
};

firebase.initializeApp(firebaseConfig);

export default firebase;