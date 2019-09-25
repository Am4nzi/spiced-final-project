import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";


import Hello from './hello';

let elem;
if (location.pathname === "/") {
    elem = <App />;
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

function HelloWorld() {
    return <div>{elem}</div>;
}
