import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

import Search from './Search';

class CharacterBlock extends Component {
    render() {
        return (
            <div>
                {/* {this.props.existingChara ?
                return the displayCharacterBlock div from below and pass in values from exstingChara :
                Run the below code because it we now know the user iscreatig a new team} */}
                {!this.props.chara ?

                    <div className="selectCharacterBlock">
                        {/* ============================================ */}
                        {/* New Team: Character Select Block */}

                        <button className="selectCharacterButton">Select Character</button>

                    </div>

                    :

                    <div className="displayCharacterBlock clearfix">
                        {/* ============================================ */}
                        {/* Existing Team: Display Character Block */}
                        {/* Character Image */}
                        <div className="characterImageContainer">
                            <img src={this.props.chara.img} alt={`${this.props.chara.name} Snapshot`} />
                        </div>
                        <div className="topBlock">
                            <h3>{this.props.chara.name}</h3>
                            <button onClick={this.props.removeCharaFromTeamBlock} className="changeCharacterButton" id={this.props.chara.name}>Change Character</button>
                        </div>

                        {/* List of Stats */}
                        <ul className="statsList">
                            <li className="charaStat combatStat">C: {this.props.chara.stats.com}</li>
                            <li className="charaStat durabilityStat">D: {this.props.chara.stats.dur}</li>
                            <li className="charaStat intelligenceStat">I: {this.props.chara.stats.int}</li>
                            <li className="charaStat powerStat">P: {this.props.chara.stats.pow}</li>
                            <li className="charaStat speedStat">Sp: {this.props.chara.stats.spd}</li>
                            <li className="charaStat strengthStat">St: {this.props.chara.stats.str}</li>
                        </ul>

                        
                    </div>
                }
            </div>
        )
    }
}

export default CharacterBlock;