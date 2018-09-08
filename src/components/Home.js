import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import firebase from 'firebase';
import swal from 'sweetalert';

// IMPORT COMPONENTS
import TeamSelect from './TeamSelect';
const dbRef = firebase.database().ref('/teams');

class Home extends Component {

    // componentDidMount() {

    // }
    setTeamName = () => {
        swal({
            title: 'Please Enter Your Team Name',
            content: 'input'
        }).then((res) => {
            let userTeam = res.trim();
            if (userTeam !== null) {

                dbRef.once("value", (snapshot) => {
                    let doesExist = false;

                    let dbTeams = snapshot.val();
                    console.log(dbTeams);
                    for (let team in dbTeams) {
                        if (dbTeams[team].teamName === userTeam) {

                            doesExist = true;
                        }
                    }

                    if (doesExist === true) {
                        swal('Error', 'This team already exists. Please choose another', 'error')
                    }
                    else {
                        this.props.createNewTeam(userTeam);
                    }
                });

            }

        });
    }

    searchTeamName = () => {
        // Prompt the user to enter their existing team's name
        swal({
            title: 'Please Enter Your Team Name',
            content: 'input'
        }).then((res) => {
            let userTeam = res.trim();
            if (userTeam !== null) {
                // If the user enters any value for their team name, user a forin loop to find their team's object in Firebase.
                dbRef.once('value', (snapshot) => {
                    // let doesExist = false;
                    let dbTeams = snapshot.val();

                    for (let team in dbTeams) {
                        if (dbTeams[team].teamName === userTeam) {

                            // doesExist = true;
                            // console.log('team exists');
                            this.props.displayExistingTeam(dbTeams[team]);
                        }
                        else {
                            swal('Error', `Sorry, we couldn't find your team. Please check your spelling or create a new team.`, 'error');
                        }
                    }

                    // if (doesExist === true) {
                    // this.displayExistingTeam(userTeam);
                    // }

                    // console.log(dbTeams);
                })
            }
        });
    }

    // displayExistingTeam = () => {

    // }

    render() {
        return (

            <section className="homeSection">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p>James</p>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.</p>

                <Link to="/TeamSelect"><button onClick={this.setTeamName} className="createNewTeamButton button">Create New Team</button></Link>

<<<<<<< HEAD
                <Link to={`/TeamSelect/`}><button className="loadTeamButton button">Load Exsting Team</button></Link>
                {/* {`/TeamSelect/${teams firebase ID}`} */}
=======
                <Link to="/TeamSelect"><button onClick={this.searchTeamName} className="loadTeamButton button">Load Existing Team</button></Link>

>>>>>>> 5370c4c6a2ba8829f544b4f87a902b15bb79e710
            </section>
        )
    }
}

export default Home;

// 1. onClick of Load Existing Team button, display a sweet alert prompting the user to enter their existing team's name. The team name is passed into the function displayExistingTeam() which is passed in from App.js.
// 2. displayExistingTeam() searches the database by team name and returns the team object.
// 3. The team object is passed as a prop to TeamSelect, which is passed as a prop to CharacterBlock based on it's index number.