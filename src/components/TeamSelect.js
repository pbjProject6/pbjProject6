import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

// COMPONENTS
import firebase from './firebase';
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

    // This function holds a single axios call to get stats for one super hero. We can call this function multiple times in componentDidMount for multiple heros.
    getStat = (hero) => {
        const apiKey = '10155759872521417';
        axios({
            method: "GET",
            url: "https://proxy.hackeryou.com",
            dataResponse: "json",
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: "brackets" });
            },
            params: {
                reqUrl: `http://superheroapi.com/api/${apiKey}/search/${hero}`,
            },
            xmlToJSON: false
        }).then(res => {
            console.log(res);
            // Array of different search results, i.e. 3 Batmans
            const heroArray = res.data.results;
            console.log(heroArray);
        });
    }

    componentDidMount() {
        // FIREBASE
        // Add event listener to tell us if the database has anything on load and when everything changes
        dbRef.on('value', (snapshot) => {
            console.log(snapshot.val());
        });

        // Call the getStat function to make the API call and get results back for one hero
        this.getStat('Batman');
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