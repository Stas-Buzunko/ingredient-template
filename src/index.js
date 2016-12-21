import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXLpIeCNlKVy1MnW-rDFv1DUkZf5ix0XY",
  authDomain: "ingredient-template.firebaseapp.com",
  databaseURL: "https://ingredient-template.firebaseio.com",
  storageBucket: "ingredient-template.appspot.com",
  messagingSenderId: "677703368816"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
