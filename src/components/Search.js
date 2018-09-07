import React, { Component } from "react";
import axios from "axios";
import Qs from 'qs';
import { BrowserRouter as Router, Link } from "react-router-dom";
import swal from 'sweetalert';

const apiKey = '10155759872521417';
let heroArray = [];
let searchResult = "";
class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: []
        }
    }

    componentDidMount() {
    }
    // get sarch results and display them on page
    searchChar = () => {
        let charString = (document.getElementById("searchInput")).value;

        axios({
            method: "GET",
            url: "https://proxy.hackeryou.com",
            dataResponse: "json",
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: "brackets" });
            },
            params: {
                reqUrl: `http://superheroapi.com/api/${apiKey}/search/${charString}`,
            },
            xmlToJSON: false
        }).then(res => {
            console.log(res);
            // Array of different search results, i.e. 3 Batmans
            heroArray = res.data.results;
            if (!heroArray) {
                swal('error', `${charString} returns no results. Please try a another character.`, 'error');
            } else {
                console.log(heroArray);
                this.setState({
                    searchResults: heroArray,
                })
            }
        });
    }
    //add clicked character to your roster/replace old character with selected one
    addToRoster(arrayIndex) {
        let selChar = heroArray[arrayIndex];

        let charObj = {
            name: selChar.name,
            img: selChar.image.url,
            stats: {
                int: selChar.powerstats.intelligence,
                str: selChar.powerstats.strength,
                spd: selChar.powerstats.speed,
                dur: selChar.powerstats.durability,
                pow: selChar.powerstats.power,
                com: selChar.powerstats.combat
            }
        };
        console.log('Testy McTesterface');
        // this.props.addToRoster(charObj);
    }

    render() {
        return (
            <div className="search">
                <h2>Add To Your Roster</h2>
                <section className="searchArea">
                    <input id="searchInput" type="text" placehholder="Search for A Character" />
                    <button className="searchCharacterButton button" onClick={this.searchChar}>Search</button>
                    <Link to="/TeamSelect"><button className="returnToTeamSelectButton button" >Return</button></Link>
                </section>
                <section className="resultsArea">
                    {heroArray.map((chara, i) => {
                        return (
                            <div key={chara.id} className="searchResult">
                                <img src={chara.image.url} alt={`${chara.name} Snapshot`} />
                                <div className="resultBody">
                                    <h3>{chara.name}</h3>
                                    <ul className="statList">
                                        <li className="charaStat">{chara.powerstats.intelligence}</li>
                                        <li className="charaStat">{chara.powerstats.strength}</li>
                                        <li className="charaStat">{chara.powerstats.speed}</li>
                                        <li className="charaStat">{chara.powerstats.durability}</li>
                                        <li className="charaStat">{chara.powerstats.power}</li>
                                        <li className="charaStat">{chara.powerstats.combat}</li>
                                    </ul>
                                    {/* can you trigger a click event and rout at the same time? */}
                                    <Link to="/TeamSelect">
                                        <button onClick={() => this.addToRoster(i)}>Add to Roster</button>
                                    </Link>
                                </div>
                                {/* if an existing character is being replaced  display the old character */}
                                {/* <img src={oldChara.image.url} alt={`${oldChara.name} Snapshot`} />
                    <div className="resultBody">
                        <h3>{oldChara.name}</h3>
                        <ul className="statList">
                            <li className="CharaStat">{oldChara.powerstats.intelligence}</li>
                            <li className="CharaStat">{oldChara.powerstats.strength}</li>
                            <li className="CharaStat">{oldChara.powerstats.speed}</li>
                            <li className="CharaStat">{oldChara.powerstats.durability}</li>
                            <li className="CharaStat">{oldChara.powerstats.power}</li>
                            <li className="CharaStat">{oldChara.powerstats.combat}</li>
                        </ul>
                    </div> */}
                            </div>
                        )
                    })}
                </section>
                {/* {searchResult} */}
            </div>
        )
    }
}

export default Search;