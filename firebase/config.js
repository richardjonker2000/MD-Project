//import * as firebase from 'firebase';
const firebase = require("firebase/app").default;
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyA20x5fChvhEM6Kv_PT5z043qmuW6Tnlac",
  authDomain: "md-ipb.firebaseapp.com",
  projectId: "md-ipb",
  storageBucket: "md-ipb.appspot.com",
  messagingSenderId: "1011081011879",
  appId: "1:1011081011879:web:3ad9c77372f147e0df3182",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
