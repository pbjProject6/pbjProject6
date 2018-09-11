import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route, onLeave
} from 'react-router-dom';
import firebase from './components/firebase';
import swal from 'sweetalert';

// COMPONENTS
import Home from './components/Home';
import TeamSelect from './components/TeamSelect';
import TeamName from './components/TeamName';
import Search from './components/Search';
import CharacterBlock from './components/CharacterBlock';
// import SearchResults from './components/SearchResults';
// import TeamReview from './components/TeamReview';
// import battle from './components/battle';
import TeamPreview from './components/TeamPreview';
import HomeButton from './components/HomeButton';
// import Results from './components/Results';

// GLOBAL VARIABLES
// Goes to the root of the firebase database
const dbRef = firebase.database().ref('/teams');
// this variable holds the team object when the user retrieves an existing team
// let existingTeamObject = {};
let tempArray = []

class App extends Component {
  constructor() {
    super();
    this.state = {
      team: {
        teamMember: [],
        teamName: '',
        key: '',
        winRatio: {
          wins: 0,
          losses: 0
        }
      },
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
        winRatio: {
          wins: 0,
          losses: 0
        },
      }
    })
    // console.log(this.state);
  }

  displayExistingTeam = (team) => {
    this.setState({
      team: team
    });
    // existingTeamObject = team
    console.log(this.state.team);
  }

  componentDidMount() {
    // FIREBASE
    // Add event listener to tell us if the database has anything on load and when everything changes
    dbRef.on('value', (snapshot) => {
    });
  }

  addToTeamArray = (charObj) => {
    const teamObject = this.state.team;


    // make sure that they cannot choose the same character twice. 
    if (teamObject.teamMember.length > 0) {
      let isInTeam = false;

      teamObject.teamMember.forEach((item) => {
        if (item.img === charObj.img) {
          isInTeam = true;

        } else {

          console.log('yes!');
        }

      });

      if (isInTeam === false) {
        teamObject.teamMember.push(charObj);
        this.setState({
          team: teamObject
        })
      } else {
        swal("Oops!", "Looks like you've already chosen that character", "error");

      }
    } else {
      teamObject.teamMember.push(charObj);
      this.setState({
        team: teamObject
      })

    }


  }

  // This function save the user's new team of five characters to the database
  saveTeamToDB = () => {
    dbRef.once("value", (snapshot) => {
      let doesExist = false;
      let dbKey = '';

      let dbTeams = snapshot.val();
      console.log(this.state.team);

      for (let team in dbTeams) {
        // console.log(dbTeams[team].teamName);
        // console.log(this.state.team.teamName);
        if (dbTeams[team].teamName === this.state.team.teamName) {
          console.log('name matches');
          console.log(team);

          doesExist = true;
          dbKey = dbTeams[team].key;
          // console.log(dbKey);
        }
      }

      if (doesExist === false) {
        console.log('testing db adding');

        const teamKey = dbRef.push().key;

        console.log(this.state.team.key);

        let teamCopy = this.state.team;
        console.log(teamCopy);
        teamCopy.key = teamKey;
        // teamCopy.name =
        this.setState({
          team: teamCopy
        })
        console.log(this.state.team.key);

        const itemReference = firebase.database().ref(`/teams/${teamKey}`);

        itemReference.set(this.state.team);
      }
      else {
        console.log(dbKey);
        const itemReference = firebase.database().ref(`/teams/${dbKey}`);
        itemReference.update(this.state.team);
        console.log(this.state.team);
      }
    })

    // make the battle button appear
    var battleButton = document.getElementById('linkToTeamPreview');
    battleButton.className = "showButton";
    // make confirm/save button small
    var saveButton = document.getElementById('saveTeamButton');
    saveButton.className = "saveTeamButton button shrink";
    // lock and unlock icons
    var unlock = document.getElementById('unlockedIcon');
    unlock.className = "fas fa-unlock lock hide";

    var lock = document.getElementById('lockedIcon');
    lock.className = "fas fa-lock lock";

  }

  updateWinLoss = (playerScore, enemyScore) => {

    //update the players win loss ratio and add it to the state
    let playerCopy = this.state.team;

    playerCopy.winRatio.wins += playerScore[0];
    playerCopy.winRatio.losses += playerScore[1];

    this.setState({
      team: playerCopy
    });

    dbRef.once("value", (snapshot) => {
      // update both database references with the updated win loss ratio
      let itemReference = firebase.database().ref(`/teams/${enemyScore.key}`);

      itemReference.update({
        winRatio: enemyScore.winRatio
      });
      console.log('enemyUpdated');

      itemReference = firebase.database().ref(`/teams/${this.state.team.key}`);

      itemReference.update({
        winRatio: this.state.team.winRatio
      });
      console.log('playerUpdated');
    });
  }

  // This function will remove a character from the team object in state. It is called when a user clicks the "Change Character" button on the TeamSelect page.
  removeCharaFromState = (e) => {
    // This variable holds the id from the button pressed to delete the character. The id is set to be the name of the character.
    const characterNameFromTeamSelect = (e.target.id);
    // Store the array of team characters in a variable
    const teamMemberArray = this.state.team.teamMember;
    // Make a copy of the state (team)
    let stateCopy = this.state.team;
    // Find the character in state that matches the button pressed
    teamMemberArray.map((character) => {
      if (character.img === characterNameFromTeamSelect) {
        let indexOfCharacter = (teamMemberArray.indexOf(character));
        // Remove the character from the copied team array and setState.
        const spliceChara = teamMemberArray.splice(indexOfCharacter, 1);
        stateCopy.teamMember = teamMemberArray;

        this.setState({
          team: stateCopy
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
          <HomeButton />
          <Route exact path="/" render={(props) => (<Home {...props} createNewTeam={this.createNewTeam} displayExistingTeam={this.displayExistingTeam} />)} />
          {/* Route to touch the TeamSelect component/page */}
          <Route path="/teamselect" render={(props) => (<TeamSelect {...props} teamObject={this.state.team} addToTeamArray={this.addToTeamArray} saveTeamToDB={this.saveTeamToDB} removeCharaFromState={this.removeCharaFromState} winRatio={this.state.team.winRatio} showStatsList={this.showStatsList} />)} />
          {/* Route to touch the TeamName component/page */}
          {/* <Route path="/teamname" render={(props) => (<TeamName {...props} existingTeamObject={this.state.team} />)} /> */}

          {/* Route to touch the CharacterBlock component/page */}
          {/* <Route path="/characterblock" render={(props) => (<CharacterBlock {...props} removeCharaFromState={this.removeCharaFromState} />)} /> */}
          {/* Route to touch the Search component/page */}
          <Route path="/search" render={(props) => (<Search {...props} />)} />
          {/* Route to touch the SearchResults component/page  */}
          {/* <Route path="/SearchResults" component={SearchResults} /> */}
          {/* Route to touch the TeamPreview component/page  */}
          <Route path="/teampreview" render={(props) => (<TeamPreview {...props} playerTeam={this.state.team} updateWinLoss={this.updateWinLoss} />)} />
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
