import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

// COMPONENTS
import CharacterBlock from './CharacterBlock';
import TeamName from './TeamName';
import Search from './Search';

// const teamObjectLength = this.props.teamObject.length;
// console.log(teamObjectLength);

class TeamSelect extends Component {
<<<<<<< HEAD
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

=======
>>>>>>> 5370c4c6a2ba8829f544b4f87a902b15bb79e710
    render() {
        return (
            <section className="teamSelectSection">
                <TeamName teamObject={this.props.teamObject} />

                <CharacterBlock chara={this.props.teamObject.teamMember[0]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[1]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[2]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[3]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[4]} />

                <div className="teamSelectButtonsContainer">
                    <button onClick={this.props.saveTeamToDB} className="saveTeamButton button">Save Team</button>

                    <Link to="/battle"><button className="goBattleButton button">Go Battle</button></Link>

                    <p className="teamWinRatio"></p>
                    {}
                    <Search addToTeamArray={this.props.addToTeamArray} />
                </div>
            </section>
        );
    }
}

export default TeamSelect;