import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import registerServiceWorker from './registerServiceWorker';
import './css/style.css';

ReactDOM.render(<Root />, document.getElementById('base'));
registerServiceWorker();
