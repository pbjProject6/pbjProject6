import React, { Component } from 'react';

class CharacterBlock extends Component {
    render() {
        return (
            <div>
                {/* Character Select Block */}
                <div className="selectCharacterBlock">
                    <button className="selectCharacterButton">Select Character</button>
                </div>

                {/* Team Name Input */}
                <label htmlFor="" className="teamNameLabel">Team Name</label>
                <input type="text" className="teamNameInput" />

                {/* Display Character Block */}
                <div className="displayCharacterBlock">
                    {/* Character Image */}
                    <div className="characterImageContainer">
                        <img src="" alt="" />
                    </div>
                    {/* List of Stats */}
                    <ul className="statsList">
                        <li className="statsList__item">C: </li>
                        <li className="statsList__item">D: </li>
                        <li className="statsList__item">I: </li>
                        <li className="statsList__item">P: </li>
                        <li className="statsList__item">Sp: </li>
                        <li className="statsList__item">St: </li>
                    </ul>

                    <button className="changeCharacterButton">Change Character</button>
                </div>

                {/* Display Team Name */}
                <h3></h3>
            </div>
        )
    }
}

export default CharacterBlock;