import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import logo from 'logo.svg';
import 'styles/App.css';
import Home from 'components/Home';
import About from 'components/About';

const ENV_ROUTES = {
  production: '/build',
  development: '/'
}

function Routes(props) {
  return (
    <Router basename={props.basedir}>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    </Router>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Routes basedir={ENV_ROUTES[process.env.NODE_ENV]} />
      </div>
    );
  }
}

export default App;
