import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Link, Redirect
} from 'react-router-dom';
import firebase from 'firebase';
import swal from 'sweetalert';

// IMPORT COMPONENTS
import TeamSelect from './TeamSelect';
const dbRef = firebase.database().ref('/teams');

class Home extends Component {
    constructor() {
        super();
        this.state = {
            buttonClass: 'button shimmer'
        }
    }
    // componentDidMount() {

    // }
    setTeamName = () => {
        swal({
            title: 'Please Enter Your Team Name',
            content: 'input',
            button: {
                className: "sweetButton",
            }
        }).then((res) => {
            if (res !== null) {
                let userTeam = res.trim();
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
                        swal({
                            title: 'Error',
                            text: 'This team already exists. Please choose another',
                            icon: 'error',
                            button: {
                                className: "sweetButton",
                            }
                        })
                    }
                    else {
                        this.props.createNewTeam(userTeam);
                        setTimeout(() => { this.setState({ redirect: true }) }, 2000)

                    }
                });

            }

        });
    }

    searchTeamName = () => {
        this.setState({
            buttonClass: 'button shimmer animated fadeOutRightBig'
        })
        // Prompt the user to enter their existing team's name
        swal({
            title: 'Please Enter Your Team Name',
            content: 'input',
            button: {
                className: "sweetButton"
            }
        }).then((res) => {
            if (res !== null) {
                let userTeam = res.trim();
                // If the user enters any value for their team name...
                dbRef.once('value', (snapshot) => {
                    let doesExist = false;
                    let dbTeams = snapshot.val();

                    console.log(dbTeams);
                    // use a forin loop to find whether the team exists in the database.
                    for (let team in dbTeams) {
                        // If the team exists, run the displayExistingTeam function to display the team's characters on the page.
                        if (dbTeams[team].teamName === userTeam) {
                            doesExist = true;
                            // console.log('team exists');
                            this.props.displayExistingTeam(dbTeams[team]);
                            console.log(dbTeams[team]);
                            setTimeout(() => { this.setState({ redirect: true }) }, 2000)


                        }
                    }
                    // If the team doesn't exist in the database, present an error message. 
                    if (doesExist !== true) {
                        // this.props.displayExistingTeam(dbTeams[team]);
                        swal({
                            title: 'Error',
                            text: `Sorry, we couldn't find your team. Please check your spelling or create a new team.`,
                            icon: 'error',
                            button: {
                                className: "sweetButton"
                            }
                        });
                    }
                })
            }
        });
    }

    render() {
        // This Redirect will send the user from Home to TeamSelect after they enter a valid team name in the prompt presented after clicking a Hom page button.
        if (this.state.redirect) {
            return (<Redirect push to="/TeamSelect" />)
        }

        return (

            <section className="homeSection">
                <header className="App-header">
                    <div className="wrapper clearfix">
                        <div className="logo"><h2>pb&j</h2></div>
                        <h1 className="title">Superhero Battle</h1>
                    </div>
                </header>

                <main className="main">
                    <div className="wrapper">
                        <div className="options">


                            <div className="homeGroup clearfix">
                                <button onClick={this.setTeamName} className="button shimmer new"><p>Create New Team</p></button>
                                <i class="fas fa-caret-left"></i>
                            </div>

                            <div className="homeGroup clearfix">
                                <button onClick={this.searchTeamName} className="button shimmer existing"><p>Load Existing Team</p></button>
                                <i class="fas fa-caret-left"></i>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        )
    }
}

export default Home;

// 1. onClick of Load Existing Team button, display a sweet alert prompting the user to enter their existing team's name. The team name is passed into the function displayExistingTeam() which is passed in from App.js.
// 2. displayExistingTeam() searches the database by team name and returns the team object.
// 3. The team object is passed as a prop to TeamSelect, which is passed as a prop to CharacterBlock based on it's index number.