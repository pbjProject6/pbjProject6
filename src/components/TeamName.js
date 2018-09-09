import React, { Component } from 'react';

class TeamName extends Component {
    render() {
        return (
            <div className="TeamName">
                {/* {this.props.teamObject.teamName !== "" ? */}

                {/* ========================================
                    Team Name Displayed: Existing team */}
                <h3 className="teamName">{this.props.teamObject.teamName}</h3>
                {/* : */}
                {/* ========================================
                    Team Name: Creating team */}
                {/* <div>
                        <label htmlFor="teamName" className="teamNameLabel">Team Name</label>
                        <input type="text" className="teamNameInput" id="teamName" />
                    </div> */}
                {/* } */}
            </div>
        );
    }
}

export default TeamName;