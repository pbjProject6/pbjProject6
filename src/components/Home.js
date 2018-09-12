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

    setTeamName = () => {

        let newButton = document.getElementById('newButton');
        newButton.className = 'button shimmer animated fadeOutRightBig'

        let existingButton = document.getElementById('existingButton');
        existingButton.className = 'button shimmer animated fadeOutRightBig'

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
                        this.setState({ redirect: true })

                    }
                });

            }

        });
    }

    // This function searches for a team name in database
    searchTeamName = () => {

        dbRef.once('value', (snapshot) => {
            let dbTeams = snapshot.val();

            // use forin loop to find the names of existing names
            teamNameArray = Object.values(dbTeams);

            this.setState({
                teamNameArray: teamNameArray,
            })
        });
    }

    // Scroll to the list of team names when clicking the button on the Home page to see pick an exsting team
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

    // Get existing team from database and display on page
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

    // Display list of existing teams
    displayBlockOfExistingTeams = () => {
        if (this.state.showList === true) {
            let homeButtons = document.getElementById('homeOptions');
            homeButtons.className = "options homeFloat";
            return (
                <div className="existingTeamsList">
                    {teamNameArray.map((team) => {
                        return (
                            <ul className="listOfExistingTeams">
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
        // This Redirect will send the user from Home to TeamSelect after they enter a valid team name in the prompt presented after clicking a Hom page button.
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