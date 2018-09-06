import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

// COMPONENTS
// import TeamSelect from './components/TeamSelect';
// import CharacterSearch from './components/CharacterSearch';
// import SearchResults from './components/SearchResults';
// import TeamReview from './components/TeamReview';
// import Battle from './components/Battle';
// import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p>James</p>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          {/* ========================================== */}
          {/* SET ROUTES FOR ALL APP ROUTING */}
          {/* Route to touch the App.js page */}
          {/* <Route exact path="/" component={App} /> */}
          {/* Route to touch the TeamSelect component/page */}
          {/* <Route path="/TeamSelect" component={TeamSelect} /> */}
          {/* Route to touch the CharacterSearch component/page  */}
          {/* <Route path="/CharacterSearch" component={CharacterSearch} /> */}
          {/* Route to touch the SearchResults component/page  */}
          {/* <Route path="/SearchResults" component={SearchResults} /> */}
          {/* Route to touch the TeamReview component/page  */}
          {/* <Route path="/TeamReview" component={TeamReview} /> */}
          {/* Route to touch the Battle component/page  */}
          {/* <Route path="/Battle" component={Battle} /> */}
          {/* Route to touch the Results component/page  */}
          {/* <Route path="/Results" component={Results} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
