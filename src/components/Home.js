import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

// IMPORT COMPONENTS
import TeamSelect from './TeamSelect';

class Home extends Component {
    render() {
        return (

            <section className="homeSection">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p>James</p>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.</p>

                <Link to="/TeamSelect"><button className="createNewTeamButton button">Create New Team</button></Link>

                <Link to="/TeamSelect"><button className="loadTeamButton button">Load Exsting Team</button></Link>

            </section>
        )
    }
}

export default Home;