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
import HomeButton from './HomeButton';

// const teamObjectLength = this.props.teamObject.length;
// console.log(teamObjectLength);

class TeamSelect extends Component {

    

    render() {
        if (this.props.teamObject.teamMember.length === 5) {
            let saveTeamButton = document.getElementById('saveTeamButton');
            saveTeamButton.classList.remove('inactiveLink')
        }
      
        
        return (


            <section className="teamSelectSection">
        
                <header className="App-header">
                    <div className="wrapper clearfix">
                        <div className="logo"><h2>pb&j</h2></div>
                        <h1 className="title">Superhero Battle</h1>
                    </div>
                </header>

                <main className="selectMain">
                    <div className="wrapper clearfix">
                        <div className="selectForm clearfix">

                            <div className="teamName">
                                <TeamName teamObject={this.props.teamObject} />
                            </div>

                            <div className="infoIcon">
                                <i class="fas fa-question-circle"></i>
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

                        <div className="teamSelectButtonsContainer">
                            <button onClick={this.props.saveTeamToDB} className="inactiveLink saveTeamButton button shimmer" id="saveTeamButton">
                                <i class="fas fa-unlock lock" id="unlockedIcon"></i>
                                <i class="fas fa-lock lock hide" id="lockedIcon"></i>
                                Confirm Team</button>

                            <Link to="/teampreview" className="linkToTeamPreview"
                                id="linkToTeamPreview"><div className="goBattleButton button">Go Battle</div></Link>

                            <HomeButton />

                            {/* <p className="teamWinRatio"></p> */}
                        </div>

                        <div className="searchTeam">
                            <Search addToTeamArray={this.props.addToTeamArray} />
                        </div>
                    </div>
                </main>
            </section>
        );
    }
}

export default TeamSelect;