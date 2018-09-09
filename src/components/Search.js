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
            searchResults: [],
            chosenCharacter: {},
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
        // console.log('Testy McTesterface');
        console.log(this.props)
        this.props.addToTeamArray(charObj);
    }

    render() {
        return (
            <div className="search">
                <section className="searchArea">
                    <input id="searchInput" type="text" placehholder="Search for A Character" />
                    <button className="searchCharacterButton" onClick={this.searchChar}>Search</button>
                </section>
                <section className="resultsArea">
                    {heroArray.map((chara, i) => {
                        return (
                                <div key={chara.id} className="searchResult clearfix">
                                    <div className="imageName">
                                        <img src={chara.image.url} alt={`${chara.name} Snapshot`} />
                                        <h3>{chara.name}</h3>
                                    </div>
                                    <div className="resultBody">
                                        <ul className="statList">
                                            <li className="intelligenceStat charaStat">Int:{chara.powerstats.intelligence}</li>
                                            <li className="strengthStat charaStat">Str:{chara.powerstats.strength}</li>
                                            <li className="speedStat charaStat">Sp:{chara.powerstats.speed}</li>
                                            <li className="durabilityStat charaStat">Dur:{chara.powerstats.durability}</li>
                                            <li className="powerStat charaStat">Pow:{chara.powerstats.power}</li>
                                            <li className="combatStat charaStat">Com:{chara.powerstats.combat}</li>
                                        </ul>
                                    {/* can you trigger a click event and rout at the same time? */}

                                    <button className="addToRosterButton" onClick={() => this.addToRoster(i)}>Add to Roster</button>

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