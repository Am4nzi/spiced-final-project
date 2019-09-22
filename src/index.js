import React from 'react';
import ReactDOM from 'react-dom';
import {SamplerContextStore} from './contexts/SamplerContext';
import App from './components/App/App';

// const path = require("path");
// const express = require('express');
// const app = express();
//
// const server = require("http").Server(app);
//
// app.use(express.static("public"));

ReactDOM.render(
    <SamplerContextStore>
      <App />
    </SamplerContextStore>,
    document.getElementById('root')
  );

  // server.listen(8080, function() {
  //     console.log("I'm listening.");
  // });
