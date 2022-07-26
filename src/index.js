import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import './index.css';

const firebaseConfig = {
    apiKey: "AIzaSyDSb57nLJsHR47ez4ugZU4H9wSGYLvVj40",
    authDomain: "chat-3e793.firebaseapp.com",
    projectId: "chat-3e793",
    storageBucket: "chat-3e793.appspot.com",
    messagingSenderId: "704348159376",
    appId: "1:704348159376:web:a9ef63700b43ceb3300715",
    measurementId: "G-C2EKM757V9",
    storageBucket: 'gs://chat-3e793.appspot.com/'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
