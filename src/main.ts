import { createApp } from "vue"
import firebase from "firebase/app"
import 'firebase/analytics'
import App from "./App.vue"
import router from './router/router'
import "virtual:windi.css"

var firebaseConfig = {
  apiKey: "AIzaSyAjq3D4De9m6_vOnFaefyqiD2tbBOJYuIg",
  authDomain: "dot-creator.firebaseapp.com",
  projectId: "dot-creator",
  storageBucket: "dot-creator.appspot.com",
  messagingSenderId: "372946048427",
  appId: "1:372946048427:web:32a9d01a1579dd73c72eee",
  measurementId: "G-GTL02DQBNR"
};

// console.log(firebase)

firebase.initializeApp(firebaseConfig);
firebase.analytics();

createApp(App).use(router).mount('#app')
