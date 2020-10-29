import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './styles.css';
import ListContainer from './containers/ListContainer';
import Home from './containers/App';

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/list" component={ListContainer} />
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
