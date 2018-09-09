import React, { Component } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import swal from 'sweetalert';



let enemyTeams = [];
let statNames = ['com', 'dur', 'int', 'pow', 'spd', 'str' ];
const dbRef = firebase.database().ref('/teams');


class TeamPreview extends Component {
    constructor(){
        super();
        this.state = {
            fightingEnemyTeam: null,
            redirect: false
        }
    }
    componentDidMount(){
        enemyTeams = [];
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
                    console.log(enemyTeams.length);
                    
                    let playersTeam = enemyTeams.splice(enemyNum, 1);
                    console.log('removes players team');
                    console.log(enemyTeams);
                    
                    enemyNum = Math.floor(Math.random() * enemyTeams.length);
                }

                this.setState({
                    fightingEnemyTeam: enemyTeams[enemyNum]
                })
            });
            
            
    }

    startBattle = () => {
        console.log("starting battle");
        //generate random number between 0 and 5 to determine stat compared
        let competeStat = Math.floor(Math.random() * statNames.length);
        let playerWins = 0;
        let enemyWins = 0;

        // compare each character to the character in the respective slot on the other team
        for( let i = 0; i <= 4; i++){
            //api stores stats as strings, must convert them to numbers to compare them
            let playerStat = parseInt(this.props.playerTeam.teamMember[i].stats[statNames[competeStat]], 10);
            let enemyStat = parseInt(this.state.fightingEnemyTeam.teamMember[i].stats[statNames[competeStat]], 10);

            console.log(playerStat, enemyStat);

            // calculate character wins by the larger stat
            if(playerStat >= enemyStat){
                console.log(`player wins match ${i}`);
                playerWins++;
            }
            else{
                console.log(`enemy wins match ${i}`);
                enemyWins++;
            }
        }
        // display match results to player and update ratios
        if(playerWins > enemyWins){
            let enemyObject = this.state.fightingEnemyTeam;
            enemyObject.winRatio.losses += 1;
            this.props.updateWinLoss([1, 0], enemyObject);
            swal(`Competed in ${statNames[competeStat]}`, `You win with ${playerWins} wins to ${enemyWins}`).then(() => {
                this.postBattleChoices();
            });
        }
        else{
            let enemyObject = this.state.fightingEnemyTeam;
            enemyObject.winRatio.wins += 1;
            this.props.updateWinLoss([0, 1], enemyObject);
            swal(`Competed in ${statNames[competeStat]}`, `The opponent won with ${enemyWins} wins to ${playerWins}`).then(() =>{
                this.postBattleChoices();
            });
        }
    }
    postBattleChoices = () =>{

        swal({
            text: 'What would you like to do next?',
            buttons: {
                rematch: {
                    text: 'Fight again?',
                    value: 'rematch'
                },
                newOpponent: {
                    text: 'Get a new Opponent?',
                    value: 'newOpponent'
                },
                adjustTeam: {
                    text: 'Adjust Team?',
                    value: 'adjustTeam'
                }


            }
        }).then((res) => {
            console.log(res);
            if(res === 'rematch'){
                //fight same opponent again
                this.startBattle();
            }
            else if(res === 'newOpponent'){
                //get a new random opponent
                this.componentDidMount();
            }
            else if(res === 'adjustTeam'){
                // go back to team select
                this.redirectToPage();
            }
        })
    }
    redirectToPage = () => {
        //change state so the if statemnt in render method will redirect back to team page
        this.setState({ redirect: true });
    }
    render(){
        if (this.state.redirect) {
            return <Redirect push to="/teamselect" />;
        }
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
                    <Link to="/teamSelect">
                        <button>Back To Team Roster</button>
                    </Link>
                    <button onClick={this.startBattle}>Start Battle</button>
                </section>
            </div>
        )
    }
}

export default TeamPreview;