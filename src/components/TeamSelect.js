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
    render() {
        return (
            <section className="teamSelectSection">
                <TeamName teamObject={this.props.teamObject} />

                <CharacterBlock chara={this.props.teamObject.teamMember[0]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                <CharacterBlock chara={this.props.teamObject.teamMember[1]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                <CharacterBlock chara={this.props.teamObject.teamMember[2]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                <CharacterBlock chara={this.props.teamObject.teamMember[3]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />
                <CharacterBlock chara={this.props.teamObject.teamMember[4]} removeCharaFromTeamBlock={this.props.removeCharaFromState} />

                <div className="teamSelectButtonsContainer">
                    <button onClick={this.props.saveTeamToDB} className="saveTeamButton button">Save Team</button>

                    <Link to="/teampreview"><button className="goBattleButton button">Go Battle</button></Link>

                    <p className="teamWinRatio"></p>
                    {}
                    <Search addToTeamArray={this.props.addToTeamArray} />
                </div>
            </section>
        );
    }
}

export default TeamSelect;