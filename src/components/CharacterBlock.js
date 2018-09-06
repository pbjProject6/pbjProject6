import React, { Component } from 'react';

class CharacterBlock extends Component {
    render() {
        return (
            <div>
                {/* ============================================ */}
                {/* New Team: Character Select Block */}
                <div className="selectCharacterBlock">
                    <button className="selectCharacterButton button">Select Character</button>
                </div>

                {/* ============================================ */}
                {/* Existing Team: Display Character Block */}
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

                    <button className="changeCharacterButton button">Change Character</button>
                </div>
            </div>
        )
    }
}

export default CharacterBlock;