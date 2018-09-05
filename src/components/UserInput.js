import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';

class UserInput extends Component {
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
            // Take the object of results from the API and convert it to an array
            const statsArray = Object.entries(res.data.results);
            console.log(statsArray);
            // Since we can get different versions of one hero back from the API, i.e. there are three kinds of Batman, this will select one of the results at random and leave us with the stats from one version of the hero.
            const oneHeroStats = statsArray[Math.floor(Math.random() * statsArray.length)];
            console.log(oneHeroStats);
        });
    }

    componentDidMount() {
        // Call the getStat function to make the API call and get results back for one hero
        this.getStat('Batman');
    }

    render() {
        return (
            <section>

            </section>
        );
    }
}

export default UserInput;