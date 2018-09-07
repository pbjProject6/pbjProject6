import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import firebase from './components/firebase';

// COMPONENTS
import Home from './components/Home';
import TeamSelect from './components/TeamSelect';
import Search from './components/Search';
// import SearchResults from './components/SearchResults';
// import TeamReview from './components/TeamReview';
import battle from './components/battle';
// import Results from './components/Results';

// GLOBAL VARIABLES
// Goes to the root of the firebase database
const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      team: {
        teamMember: []
      }
    };
  }

  createTeam = () => {
    this.setState({
      team: {
        teamMember: [
          {}
          //   order: 1,
          //   name: "",
          //   img: "",
          //   stats: {
          //     int: "",
          //     str: "",
          //     spd: "",
          //     dur: "",
          //     pow: "",
          //     com: "",
          //   },
          //   winRatio: "",
        ],
        teamName: "",
        winRation: "",
      }
    })
  }

  componentDidMount() {
    // FIREBASE
    // Add event listener to tell us if the database has anything on load and when everything changes
    dbRef.on('value', (snapshot) => {
      console.log(snapshot.val());
    });
  }

  addToTeamArray = (charObj) => {
    const teamArray = this.state.team;
    teamArray.teamMember.push(charObj);
    this.setState({
      team: teamArray
    })
  }

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
          <Route path="/Search" render={(props) => (<Search {...props} addToTeamArray={this.addToTeamArray} />)} />
          {/* Route to touch the SearchResults component/page  */}
          {/* <Route path="/SearchResults" component={SearchResults} /> */}
          {/* Route to touch the TeamReview component/page  */}
          {/* <Route path="/TeamReview" component={TeamReview} /> */}
          {/* Route to touch the Battle component/page  */}
          {/* <Route path="/battle" component={battle} /> */}
          {/* Route to touch the Results component/page  */}
          {/* <Route path="/Results" component={Results} /> */}

        </div>
      </Router>
    );
  }
}

export default App;
