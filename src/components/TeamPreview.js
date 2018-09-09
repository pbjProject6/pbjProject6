import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import firebase from "firebase";



let enemyTeams = [];
const dbRef = firebase.database().ref('/teams');


class TeamPreview extends Component {
    constructor(){
        super();
        this.state = {
            fightingEnemyTeam: null
        }
    }
    componentDidMount(){

        let teamNumRef;
            //get total number of teams in database

            dbRef.once('value', (snapshot) => {
                console.log(snapshot.val());
                
                //create an array of all the teams in the database
                let dbEnemyTeams = snapshot.val();
                for(let team in dbEnemyTeams){
                    
                    enemyTeams.push(dbEnemyTeams[team]);
                }
                console.log(enemyTeams);

                // genereate a random number and get a random team
                let enemyNum = Math.floor(Math.random() * enemyTeams.length);
                // if the randomly generated team is the players team
                if(enemyTeams[enemyNum].teamName === this.props.playerTeam.teamName){
                    //remove it and get a new one
                    let playersTeam = enemyTeams.splice([enemyNum, 1]);
                    console.log('removes players team');
                    
                    enemyNum = Math.floor(Math.random() * enemyTeams.length);
                }

                this.setState({
                    fightingEnemyTeam: enemyTeams[enemyNum]
                })
            });
            
            
    }

    startBattle = () => {
        
    }
    render(){
        
        return(
            <div className="teamPreview">
                <section className="playerTeam">
                    <h2>{this.props.playerTeam.teamName}</h2>
                    {this.props.playerTeam.teamMember.map((char) =>{
                        return(
                            <div className="characterBlock player">
                                <img src={char.img} alt={`${char.name} Snapshot`} />
                                <h3>{char.name}</h3>
                            </div>
                        )
                    })}
                </section>
                {this.state.fightingEnemyTeam === null ? null :
                <section className="enemyTeam">
                    <h2>{this.state.fightingEnemyTeam.teamName}</h2>
                    {this.state.fightingEnemyTeam.teamMember.map((char) => {
                        return (
                            <div className="characterBlock enemy">
                                <img src={char.img} alt={`${char.name} Snapshot`} />
                                <h3>{char.name}</h3>
                            </div>
                        )
                    })}
                </section>
                }
                <section className="teamButtons">
                    <Link to="/teampreview">
                        <button>Back To Team Roster</button>
                    </Link>
                    <button onClick={this.startBattle}>Start Battle</button>
                </section>
            </div>
        )
    }
}

export default TeamPreview;