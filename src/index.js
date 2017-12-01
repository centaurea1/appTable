import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Table1 from './table1';
import Tabs from './tabs';
// import Search from './search';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Table1 />, document.getElementById('root'));
ReactDOM.render(<Tabs />, document.getElementById('root'));
// ReactDOM.render(<Search />, document.getElementById('root'));
registerServiceWorker();
