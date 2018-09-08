import React, { Component } from 'react';

class TeamName extends Component {
    render() {
        return (
            <div className="TeamName">
                {/* If this.props.existingChara exists, return a header with the team name. If not, retunr everything below. */}
                {/* ======================================== */}
                {/* Team Name: Creating team */}
                <label htmlFor="teamName" className="teamNameLabel">Team Name</label>
                <input type="text" className="teamNameInput" id="teamName" />

                {/* ======================================== */}
                {/* Team Name Displayed: Existing team */}
                <h3></h3>
            </div>
        );
    }
}

export default TeamName;