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
            // Array of different search results, i.e. 3 Batmans
            const heroArray = res.data.results;
            console.log(heroArray);
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