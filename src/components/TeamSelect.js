import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import firebase from './firebase';

// COMPONENTS
import CharacterBlock from './CharacterBlock';
import TeamName from './TeamName';

// GLOBAL VARIABLES
// Goes to the root of the firebase database
const dbRef = firebase.database().ref();

class TeamSelect extends Component {
    constructor() {
        super();
        this.state = {
            teams: []
        };
    }

    createTeam = () => {
        this.setState({
            teams: {
                teamMember: [
                    {
                        order: 1,
                        name: "",
                        img: "",
                        stats: {
                            int: "",
                            str: "",
                            spd: "",
                            dur: "",
                            pow: "",
                            com: "",
                        },
                        winRatio: "",
                    },
                    {
                        order: 2,
                        name: "",
                        img: "",
                        stats: {
                            int: "",
                            str: "",
                            spd: "",
                            dur: "",
                            pow: "",
                            com: "",
                        },
                        winRatio: "",
                    },
                    {
                        order: 3,
                        name: "",
                        img: "",
                        stats: {
                            int: "",
                            str: "",
                            spd: "",
                            dur: "",
                            pow: "",
                            com: "",
                        },
                        winRatio: "",
                    },
                    {
                        order: 4,
                        name: "",
                        img: "",
                        stats: {
                            int: "",
                            str: "",
                            spd: "",
                            dur: "",
                            pow: "",
                            com: "",
                        },
                        winRatio: "",
                    },
                    {
                        order: 5,
                        name: "",
                        img: "",
                        stats: {
                            int: "",
                            str: "",
                            spd: "",
                            dur: "",
                            pow: "",
                            com: "",
                        },
                        winRatio: "",
                    },
                ],
                teamName: "",
                winRation: "",
            }
        })
    }
    createTeam = (code) => {
        dbRef.once('value', (snapshot) => {
            let teams = snapshot.val();
        });
        // get item reference from the code passed in
            const itemReference = firebase.database().ref(`superherobattle/${code}`);
            //set the state equal to the team gotten from the database
            this.setState({
                team: itemReference
            })
    }
    componentDidMount() {
        // FIREBASE
        // Add event listener to tell us if the database has anything on load and when everything changes
        dbRef.on('value', (snapshot) => {
            console.log(snapshot.val());
        });

        let queryString = ""
        // get querystring form the window
        if( queryString !== ""){
            
            this.loadTeam();
        }else{
            this.createTeam(queryString);
        }
    }

    render() {
        return (
            <section className="teamSelectSection">
                <TeamName />

                <CharacterBlock />
                <CharacterBlock />
                <CharacterBlock />
                <CharacterBlock />
                <CharacterBlock />

                <div className="teamSelectButtonsContainer">
                    <button className="saveTeamButton button">Save Team</button>

                    <Link to="/battle"><button className="goBattleButton button">Go Battle</button></Link>

                    <p className="teamWinRatio"></p>
                </div>

            </section>
        );
    }
}

export default TeamSelect;