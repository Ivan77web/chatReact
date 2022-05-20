import React, { createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import firebase from 'firebase'
// import 'firebase/firestore';
// import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDjmEzxowZKJLFB2WigVRA1yGTRPu7iLMQ",
  authDomain: "chat-react-55b29.firebaseapp.com",
  projectId: "chat-react-55b29",
  storageBucket: "chat-react-55b29.appspot.com",
  messagingSenderId: "60911938627",
  appId: "1:60911938627:web:77963552162d69def878f6",
  measurementId: "G-JXJK8R7RQE"
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    firestore,
    auth
  }}>
    <App />
  </Context.Provider>,
);
