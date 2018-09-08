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
import TeamName from './components/TeamName';
import Search from './components/Search';
import CharacterBlock from './components/CharacterBlock';
// import SearchResults from './components/SearchResults';
// import TeamReview from './components/TeamReview';
import battle from './components/battle';
// import Results from './components/Results';

// GLOBAL VARIABLES
// Goes to the root of the firebase database
const dbRef = firebase.database().ref('/teams');
// this variable holds the team object when the user retrieves an existing team
// let existingTeamObject = {};

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
    // console.log(this.state);
  }

  displayExistingTeam = (team) => {
    this.setState({
      team: team
    });
    // existingTeamObject = team
    console.log(team);
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

  // This function save the user's new team of five characters to the database
  saveTeamToDB = () => {
    dbRef.once("value", (snapshot) => {
      let doesExist = false;
      let dbKey = '';

      let dbTeams = snapshot.val();
      console.log(dbTeams);

      for (let team in dbTeams) {
        if (dbTeams[team].teamName === this.state.team.teamName) {
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

  // This function will remove a character from the team object in state. It is called when a user clicks the "Change Character" button on the TeamSelect page.
  removeCharaFromState = (e) => {
    const characterNameFromTeamSelect = (e.target.id);
    const teamMemberArray = this.state.team.teamMember;
    teamMemberArray.map((character) => {
      if (character.name === characterNameFromTeamSelect) {
        // const characterArray = this.state.team.teamMember
        let indexOfCharacter = (teamMemberArray.indexOf(character));
        let newArray = teamMemberArray.splice(indexOfCharacter, 1);
        console.log(teamMemberArray);
        this.setState({
          team: {
            teamMember: teamMemberArray
          }
        })
      }
    })

  }

  render() {
    return (
      <Router>
        <div className="App">

          {/* ========================================== */}
          {/* SET ROUTES FOR ALL APP ROUTING */}
          <Route exact path="/" render={(props) => (<Home {...props} createNewTeam={this.createNewTeam} displayExistingTeam={this.displayExistingTeam} />)} />
          {/* Route to touch the TeamSelect component/page */}
          <Route path="/teamselect" render={(props) => (<TeamSelect {...props} teamObject={this.state.team} addToTeamArray={this.addToTeamArray} saveTeamToDB={this.saveTeamToDB} removeCharaFromState={this.removeCharaFromState} />)} />
          {/* Route to touch the TeamName component/page */}
          {/* <Route path="/teamname" render={(props) => (<TeamName {...props} existingTeamObject={this.state.team} />)} /> */}

          {/* Route to touch the CharacterBlock component/page */}
          {/* <Route path="/characterblock" render={(props) => (<CharacterBlock {...props} removeCharaFromState={this.removeCharaFromState} />)} /> */}
          {/* Route to touch the Search component/page */}
          <Route path="/search" render={(props) => (<Search {...props} />)} />
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
