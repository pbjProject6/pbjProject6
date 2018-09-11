import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Link, Redirect
} from 'react-router-dom';
import firebase from 'firebase';
import swal from 'sweetalert';
// import Sound from 'react-sound';
import ReactDOM from 'react-dom';
import ReactAudioPlayer from 'react-audio-player';
// import theme from '../assets/audio/theme/audioTheme.mp3';
// import Sound from 'react-sound';

// IMPORT COMPONENTS
import TeamSelect from './TeamSelect';
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
                        setTimeout(() => { this.setState({ redirect: true }) }, 2000)

                    }
                });

            }

        });
    }


    searchTeamName = () => {

        dbRef.once('value', (snapshot) => {
            let dbTeams = snapshot.val();

            // console.log(dbTeams);

            // use forin loop to find the names of existing names
            teamNameArray = Object.values(dbTeams);

            this.setState({
                teamNameArray: teamNameArray,
            })


        });
    }

    // audioPlay = () => {
    //     const audioNode = this.audioRef.current;
    //     audioNode.play();
    //     console.log(audioNode);
    // }

    // audioThemePlay = () => {
    //     document.getElementById('themeAudio').setAttribute('autoplay', true);
    // }

    existingTeamButtonClick = () => {
        // this.audioPlay();
        this.props.audioThemePlay();
        this.searchTeamName();
        this.setState({
            showList: true
        })
    }

    selectExistingTeam = (clickedTeam) => {
        dbRef.once('value', (snapshot) => {
            let dbTeams = snapshot.val();

            for (let team in dbTeams) {
                if (dbTeams[team].teamName === clickedTeam) {
                    this.props.displayExistingTeam(dbTeams[team]);
                    setTimeout(() => { this.setState({ redirect: true }) }, 2000)
                }
                console.log(team);

                // If the team exists, run the displayExistingTeam function to display the team's characters on the page

            }
        })
    }

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

    createNewTeamButtonClick = () => {
        // this.audioPlay();
        this.props.audioThemePlay();
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
                    <div className="wrapper clearfix">
                        <h2 className="logo">pb&j</h2>
                        <h1 className="title">Havoc Of Heros</h1>
                    </div>
                </header>

                {/* <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button> */}

                {/* <audio ref={this.audioRef} src={theme} /> */}
                {/* <Sound
                    url={theme}
                    playStatus={Sound.status.PLAYING}
                    autoLoad={false}
                /> */}

                {/* <ReactAudioPlayer
                    src={theme}
                    controls
                    id="themeAudio"
                /> */}

                <main className="main">
                    <div className="wrapper">
                        <div className="options" id="homeOptions">

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

// 1. onClick of Load Existing Team button, display a sweet alert prompting the user to enter their existing team's name. The team name is passed into the function displayExistingTeam() which is passed in from App.js.
// 2. displayExistingTeam() searches the database by team name and returns the team object.
// 3. The team object is passed as a prop to TeamSelect, which is passed as a prop to CharacterBlock based on it's index number.