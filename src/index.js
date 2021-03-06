import React from 'react';
import ReactDOM from 'react-dom';
import PrototypeChainCreator from './PrototypeChainCreator';
import registerServiceWorker from './registerServiceWorker';

var theBoard = {
  model: {
    board: {
      node: [{
        x: 0,
        y: 0,
        name: 'make your time!'
      }, {
        x: 100,
        y: 100,
        name: 'all your base'
      }, {
        x: 100,
        y: 500,
        name: 'are belong to us!'
      }],
      connection: {
        0: [1]
      }
    }
  }
};

theBoard.dom = ReactDOM.render(<PrototypeChainCreator model={theBoard.model} />, document.getElementById('root'));

registerServiceWorker();
