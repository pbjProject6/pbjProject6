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

    componentDidMount() {

    }
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

                    for (let team in dbTeams) {
                        if (dbTeams[team].name === userTeam) {

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

                <Link to="/TeamSelect"><button className="loadTeamButton button">Load Exsting Team</button></Link>

            </section>
        )
    }
}

export default Home;