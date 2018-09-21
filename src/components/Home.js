import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Link, Redirect
} from 'react-router-dom';
import firebase from 'firebase';
import swal from 'sweetalert';
// import ReactAudioPlayer from 'react-audio-player';
import scrollToComponent from 'react-scroll-to-component';

// IMPORT COMPONENTS
const dbRef = firebase.database().ref('/teams');
let teamNameArray = [];

class Home extends Component {
    constructor() {
        super();
        this.state = {
            buttonClass: 'button shimmer',
            teamNameArray: [],
            redirect: false,
            showList: false
        }
    }

    // When the user click to create a new team, this function 
    setTeamName = () => {
        // Add classes to the Home page buttons that will apply the shimmer animations
        let newButton = document.getElementById('newButton');
        newButton.className = 'button shimmer animated fadeOutRightBig'

        let existingButton = document.getElementById('existingButton');
        existingButton.className = 'button shimmer animated fadeOutRightBig'
        //Present the user with an alert asking them to enter a new team name
        swal({
            title: 'Please Enter Your Team Name',
            content: 'input',
            button: {
                className: "sweetButton",
            }
            // If the user enters a value in the alert, take a snapshot of the results from firebase and compare them with the team name entered by the user.
        }).then((res) => {
            if (res !== null) {
                let userTeam = res.trim();
                dbRef.once("value", (snapshot) => {
                    let doesExist = false;

                    let dbTeams = snapshot.val();
                    console.log(dbTeams);
                    for (let team in dbTeams) {
                        // Check whether the team name entered by the user equals a team that already exists in the database.
                        if (dbTeams[team].teamName === userTeam) {

                            doesExist = true;
                        }
                    }
                    // If the team name entered by the user already exists in the database, present an alert asking them to enter a new team name.
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
                        // If the team doesn't alreay exist in the database pass the new team name into the createNewTeam function
                        this.props.createNewTeam(userTeam);
                        //  Redirect to true will send the user to the TeamSelect page.
                        this.setState({ redirect: true })
                    }
                });
            }
        });
    }

    // This function searches for a team name in the database
    searchTeamName = () => {
        // Take a snapshot of the teams object in the database
        dbRef.once('value', (snapshot) => {
            let dbTeams = snapshot.val();

            // Convert the team object to an array
            teamNameArray = Object.values(dbTeams);
            // Add the team array to state
            this.setState({
                teamNameArray: teamNameArray,
            })
        });
    }

    // Scroll to the list of team names when clicking the button on the Home page to see existing teams
    scrollDown = () => {
        let teamList = document.getElementById('existingButton');
        teamList.scrollIntoView();
        scrollToComponent(teamList);
    }

    // Button click when wanting to play with an existing team.
    existingTeamButtonClick = () => {
        // this.props.audioThemePlay();
        this.searchTeamName();
        this.scrollDown();
        this.setState({
            showList: true
        })
    }

    // Get existing team from the database, pass it into the displayExistingTeam function which sets the state in App.js with the user's team. Redirect the user to the TeamSelect page.
    selectExistingTeam = (clickedTeam) => {
        dbRef.once('value', (snapshot) => {
            let dbTeams = snapshot.val();

            for (let team in dbTeams) {
                if (dbTeams[team].teamName === clickedTeam) {
                    this.props.displayExistingTeam(dbTeams[team]);
                    this.setState({ redirect: true });
                }
            }
        })
    }

    // If showList is true, which is set to true when the user click the button to use an existing team, render the list of existing teams.
    displayBlockOfExistingTeams = () => {
        if (this.state.showList === true) {
            let homeButtons = document.getElementById('homeOptions');
            homeButtons.className = "options homeFloat";
            return (
                <div className="existingTeamsList">
                    {/* Map the team array from state and render a list of teams names */}
                    {teamNameArray.map((team) => {
                        return (
                            <ul className="listOfExistingTeams">
                                {/* On clicking one of the existing teams, fun the selectExistingTeam function and pass in the team name. That function will look for the tam in the database and display pass the iformation to be available on the TeamSelect page.*/}
                                <li onClick={() => { (this.selectExistingTeam(team.teamName)) }} >{team.teamName}</li>
                            </ul>
                        )
                    })}
                </div>
            )
        }
    }

    // Begin creating new team and play audio when clicking new team button on Home page
    createNewTeamButtonClick = () => {
        // this.props.audioThemePlay();
        this.setTeamName();
    }

    render() {
        // This Redirect will send the user from Home to TeamSelect after they enter a valid team name in the prompt presented after clicking a Home page button.
        if (this.state.redirect) {
            return (<Redirect push to="/TeamSelect" />)
        }

        return (

            <section className="homeSection">
                <header className="App-header">
                    <div className="wrapper clearfix headerTextContainer">
                        <h2 className="logo">pb&j</h2>
                        <h1 className="title home">Havoc Of Heros</h1>
                    </div>
                </header>

                <main className="main">
                    <div className="wrapper">
                        <p className="instructions">Create a new team of superheroes or call upon your existing heroes</p>

                        <div className="options homeButtonsContainer clearfix" id="homeOptions">

                            <div className="homeGroup clearfix">
                                <button onClick={this.createNewTeamButtonClick} className="button" id="newButton"><p>Create New Team</p></button>
                                <i class="fas fa-caret-left"></i>
                            </div>

                            <div className="homeGroup clearfix">
                                <button onClick={this.existingTeamButtonClick} className="button" id="existingButton"><p>Load Existing Team</p></button>
                                <i class="fas fa-caret-left"></i>
                            </div>
                        </div>

                        {this.displayBlockOfExistingTeams()}

                    </div>
                </main>
            </section>
        )
    }
}

export default Home;