import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import firebase from "firebase";


let playerTeam = this.props.team.characters;
class TeamPreview extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    componentDidMount(){
        this.dbRef = firebase.database().ref();

        this.dbRef.once("value", (snapshot) => {
            //get total number of teams in database
        });
    }
    startBattle(){
        
    }
    render(){
        return(
            <div className="teamPreview">
                <section className="playerTeam">
                    <h2>{this.props.team.name}</h2>
                    {playerTeam.map((char) =>{
                        return(
                            <div className="characterBlock player">
                                <img src={char.image.url} alt={`${char.name} Snapshot`} />
                                <h3>{char.name}</h3>
                            </div>
                        )
                    })}
                </section>
                <section className="enemyTeam">
                    {/* <h2>enemy team name</h2> */}
                    {enemyTeam.map((char) => {
                        return(
                            <div className="characterBlock enemy">
                                <img src={char.image.url} alt={`${char.name} Snapshot`} />
                                <h3>{char.name}</h3>
                            </div>
                        )
                    })}
                </section>
                <section className="teamButtons">
                    <Link to="/">
                        <button onClick={}>Back To Team Roster</button>
                    </Link>
                    <button onClick={this.startBattle}>Start Battle</button>
                </section>
                <Route path="/"  component={}/>
            </div>
        )
    }
}

export default TeamPreview;