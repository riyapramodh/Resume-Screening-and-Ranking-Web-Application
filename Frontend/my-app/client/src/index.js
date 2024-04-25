// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Rout from './Routes'; // Updated import name

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Rout /> {/* Use Rout component */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
