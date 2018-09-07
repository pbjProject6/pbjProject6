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
const dbRef = firebase.database().ref('/teams');

class App extends Component {
  constructor() {
    super();
    this.state = {
      team: {
        teamMember: [],
        teamName: '',
        key: ''
      }
    };
  }

  createNewTeam = (teamName) => {
    console.log('creating new Team');

    this.setState({
      team: {
        teamMember: [
          // order: 1,
          // name: "",
          // img: "",
          // stats: {
          //   int: "",
          //   str: "",
          //   spd: "",
          //   dur: "",
          //   pow: "",
          //   com: "",
          // },
          // winRatio: "",
        ],
        teamName: teamName,
        winRatio: "",
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
    const teamObject = this.state.team;
    teamObject.teamMember.push(charObj);
    this.setState({
      team: teamObject
    })
  }

  saveTeamToDB = () => {
    dbRef.once("value", (snapshot) => {
      let doesExist = false;
      let dbKey = '';

      let dbTeams = snapshot.val();
      console.log(snapshot);

      for (let team in dbTeams) {
        if (dbTeams[team].name === this.state.team.name) {
          console.log('name matches');

          doesExist = true;
          dbKey = dbTeams[team].key;
        }
      }

      if (doesExist === false) {
        console.log('testing db adding');

        const teamKey = dbRef.push().key;

        console.log(this.state.team.key);

        let teamCopy = this.state.team;
        teamCopy.key = teamKey;
        // teamCopy.name =
        this.setState({
          team: teamCopy
        })
        console.log(this.state.team.key);

        const itemReference = firebase.database().ref(`/teams/${teamKey}`);

        itemReference.set(this.state.team);
      }




    })


  }

  render() {
    return (
      <Router>
        <div className="App">

          {/* ========================================== */}
          {/* SET ROUTES FOR ALL APP ROUTING */}
          <Route exact path="/" render={(props) => (<Home {...props} createNewTeam={this.createNewTeam} />)} />
          {/* Route to touch the TeamSelect component/page */}
          <Route path="/TeamSelect" render={(props) => (<TeamSelect {...props} teamObject={this.state.team} addToTeamArray={this.addToTeamArray} saveTeamToDB={this.saveTeamToDB} />)} />
          {/* Route to touch the CharacterSearch component/page */}
          <Route path="/Search" render={(props) => (<Search {...props} />)} />
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
