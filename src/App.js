import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


// COMPONENTS
import Home from './components/Home';
import TeamSelect from './components/TeamSelect';
import Search from './components/Search';
// import SearchResults from './components/SearchResults';
// import TeamReview from './components/TeamReview';
import battle from './components/battle';
// import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          {/* ========================================== */}
          {/* SET ROUTES FOR ALL APP ROUTING */}
          <Route exact path="/" component={Home} />
          {/* Route to touch the TeamSelect component/page */}
          <Route path="/TeamSelect" component={TeamSelect} />
          {/* Route to touch the CharacterSearch component/page */}
          <Route path="/Search" component={Search} />
          {/* Route to touch the SearchResults component/page  */}
          {/* <Route path="/SearchResults" component={SearchResults} /> */}
          {/* Route to touch the TeamReview component/page  */}
          {/* <Route path="/TeamReview" component={TeamReview} /> */}
          {/* Route to touch the Battle component/page  */}
          <Route path="/battle" component={battle} />
          {/* Route to touch the Results component/page  */}
          {/* <Route path="/Results" component={Results} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
