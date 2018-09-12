import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import swal from 'sweetalert';
import swal2 from 'sweetalert2'

// COMPONENTS
import CharacterBlock from './CharacterBlock';
import TeamName from './TeamName';
import Search from './Search';


class TeamSelect extends Component {

    // This function will create and call the powerstats description pop-up
    statsInfoIconClick = () => {
        let statsList = document.createElement("ul");
        statsList.classList.add("statsDescription__list")
        let combatStat = `<li class="statsDescription__item"><strong>C</strong> = Combat</li>`;
        let durabilityStat = `<li class="statsDescription__item"><strong>D</strong> = Durability</li>`;
        let intelligenceStat = `<li class="statsDescription__item"><strong>I</strong> = Intelligence</li>`;
        let powerStat = `<li class="statsDescription__item"><strong>P</strong> = Power</li>`;
        let speedStat = `<li class="statsDescription__item"><strong>Sp</strong> = Speed</li>`;
        let strengthStat = `<li class="statsDescription__item"><strong>St</strong> = Strength</li>`;
        statsList.innerHTML = `${combatStat}${durabilityStat}${intelligenceStat}${powerStat}${speedStat}${strengthStat}`;
        swal({
            title: 'Powerstats',
            content: statsList,
            button: {
                className: "sweetButton"
            },
            className: "statsDescription"
        })
    }

    render() {

        return (


            <section className="teamSelectSection">

                <header className="App-header">
                    <div className="wrapper clearfix headerTextContainer">
                        <div className="logo"><h2>pb&j</h2></div>
                        <h1 className="title">Havoc Of Heros</h1>
                    </div>
                </header>

                <main className="selectMain">
                    <div className="wrapper clearfix">
                        <div className="selectForm clearfix">

                            <div className="teamName">
                                <TeamName teamObject={this.props.teamObject} />
                            </div>

                            <div className="infoIcon">
                                <i onClick={this.statsInfoIconClick} className="fas fa-question-circle"></i>
                            </div>


                            <div className="characterBlockContainer">
                                <CharacterBlock chara={this.props.teamObject.teamMember[0]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                            </div>

                            <div className="characterBlockContainer">
                                <CharacterBlock chara={this.props.teamObject.teamMember[1]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                            </div>

                            <div className="characterBlockContainer">
                                <CharacterBlock chara={this.props.teamObject.teamMember[2]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                            </div>

                            <div className="characterBlockContainer">
                                <CharacterBlock chara={this.props.teamObject.teamMember[3]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                            </div>

                            <div className="characterBlockContainer">
                                <CharacterBlock chara={this.props.teamObject.teamMember[4]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />

                            </div>

                        </div>



                        <div className="searchTeam">
                            <Search addToTeamArray={this.props.addToTeamArray} saveTeamToDB={this.props.saveTeamToDB} teamObject={this.props.teamObject} />
                        </div>
                    </div>
                </main>
            </section>
        );
    }
}

export default TeamSelect;