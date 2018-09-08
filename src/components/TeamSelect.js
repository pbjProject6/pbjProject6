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

class TeamSelect extends Component {
    render() {
        return (
            <section className="teamSelectSection">
                <TeamName />

                <CharacterBlock chara={this.props.teamObject.teamMember[0]} existingChara={this.props.existingTeamObject.teamMember[0]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[1]} existingChara={this.props.existingTeamObject.teamMember[1]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[2]} existingChara={this.props.existingTeamObject.teamMember[2]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[3]} existingChara={this.props.existingTeamObject.teamMember[3]} />
                <CharacterBlock chara={this.props.teamObject.teamMember[4]} existingChara={this.props.existingTeamObject.teamMember[4]} />

                <div className="teamSelectButtonsContainer">
                    <button onClick={this.props.saveTeamToDB} className="saveTeamButton button">Save Team</button>

                    <Link to="/battle"><button className="goBattleButton button">Go Battle</button></Link>

                    <p className="teamWinRatio"></p>

                    <Search addToTeamArray={this.props.addToTeamArray} />
                </div>
            </section>
        );
    }
}

export default TeamSelect;