import React from 'react';
import ReactDOM from 'react-dom';
import {SamplerContextStore} from './contexts/SamplerContext';
import App from './components/App/App';
// import { createStore, applyMiddleware } from 'redux';
// import reducer from './reducers/samplerReducer';

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

ReactDOM.render(
    <SamplerContextStore>
      <App />
    </SamplerContextStore>,
    document.getElementById('root')
  );
