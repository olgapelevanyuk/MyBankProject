"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './Pages/MainPage';

// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <MainPage/>
, document.getElementById('container') );

let fetchData = async () => {
  let data = await fetch('http://localhost:3000/users');
  console.log(data);
}
fetchData();
