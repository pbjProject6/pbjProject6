import React, { Component } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import swal from 'sweetalert';

// COMPONENTS
import HomeButton from './HomeButton';

let enemyTeams = [];
let statNames = ['com', 'dur', 'int', 'pow', 'spd', 'str'];
let statFullNames = ['Combat', 'Durability', 'Intelligence', 'Power', 'Speed', 'Strength'];
const dbRef = firebase.database().ref('/teams');


class TeamPreview extends Component {
    constructor() {
        super();
        this.state = {
            fightingEnemyTeam: null,
            redirect: false
        }
    }
    componentDidMount() {
        enemyTeams = [];
        let teamNumRef;
        //get total number of teams in database

        dbRef.once('value', (snapshot) => {
            console.log(snapshot.val());

            //create an array of all the teams in the database
            let dbEnemyTeams = snapshot.val();
            for (let team in dbEnemyTeams) {

                enemyTeams.push(dbEnemyTeams[team]);
            }
            console.log(enemyTeams);

            // genereate a random number and get a random team
            let enemyNum = Math.floor(Math.random() * enemyTeams.length);
            // if the randomly generated team is the players team
            if (enemyTeams[enemyNum].teamName === this.props.playerTeam.teamName) {
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

    redoAnimation = () => {
        let badTeam = document.getElementById('enemyBlock')
        badTeam.className = 'enemyTeam';

        let goodTeam = document.getElementById('playerBlock')
        goodTeam.className = 'playerTeam';
    }

    startBattle = () => {

        
        //generate random number between 0 and 5 to determine stat compared
        let competeStat = Math.floor(Math.random() * statNames.length);
        let player = this.props.playerTeam;
        let enemy = this.state.fightingEnemyTeam;
        let playerWins = 0;
        let enemyWins = 0;
        let result = document.createElement("div");
        let playerResult = document.createElement("div");
        playerResult.classList.add("sweetResultsDiv")
        let vs = document.createElement("div");
        vs.classList.add("sweetVsDiv");
        let enemyResult = document.createElement("div");
        enemyResult.classList.add("sweetResultsDiv")

        // compare each character to the character in the respective slot on the other team
        for (let i = 0; i <= 4; i++) {
            //api stores stats as strings, must convert them to numbers to compare them
            let playerStat = parseInt(player.teamMember[i].stats[statNames[competeStat]], 10);
            let enemyStat = parseInt(enemy.teamMember[i].stats[statNames[competeStat]], 10);

            console.log(playerStat, enemyStat);

            // calculate character wins by the larger stat
            if (playerStat >= enemyStat) {
                playerWins++;
            }
            else {
                enemyWins++;
            }
            playerResult.innerHTML += `<p>${player.teamMember[i].name} : <strong>${playerStat}</strong></p>`;
            vs.innerHTML += `<p> VS </p>`
            enemyResult.innerHTML += `<p>${enemy.teamMember[i].name} : <strong>${enemyStat}</strong></p>`;
        }
        result.appendChild(playerResult);
        result.appendChild(vs);
        result.appendChild(enemyResult);
        // display match results to player and update ratios
        setTimeout(() => {
            if (playerWins > enemyWins) {
                let enemyObject = this.state.fightingEnemyTeam;
                enemyObject.winRatio.losses += 1;
                this.props.updateWinLoss([1, 0], enemyObject);

                result.innerHTML += `You win with ${playerWins} wins to ${enemyWins}`;

                swal({
                    title: `Competed in ${statFullNames[competeStat]}`,
                    content: result,
                    button: {
                        className: "sweetButton"
                    }
                }).then(() => {
                    this.postBattleChoices();
                });
            }
            else {
                let enemyObject = this.state.fightingEnemyTeam;
                enemyObject.winRatio.wins += 1;
                this.props.updateWinLoss([0, 1], enemyObject);
                swal({
                    title: `Competed in ${statNames[competeStat]}`,
                    content: result,
                    button: {
                        className: "sweetButton"
                    }
                }).then(() => {
                    this.postBattleChoices();
                });
            }
        }, 1500)

        // battle animations
        let badTeam = document.getElementById('enemyBlock')
        badTeam.className = 'enemyTeam animated fadeOutLeft';

        let goodTeam = document.getElementById('playerBlock')
        goodTeam.className = 'playerTeam animated fadeOutRight';

    }


    postBattleChoices = () => {

        swal({
            text: 'What would you like to do next?',
            buttons: {
                rematch: {
                    text: 'Fight again?',
                    value: 'rematch',
                    className: "sweetButton"
                },
                newOpponent: {
                    text: 'Get a new Opponent?',
                    value: 'newOpponent',
                    className: "sweetButton"
                },
                adjustTeam: {
                    text: 'Adjust Team?',
                    value: 'adjustTeam',
                    className: "sweetButton"
                }
            },
            customClass: 'sweetWideAlert'
        }).then((res) => {
            console.log(res);
            if (res === 'rematch') {
                //fight same opponent again

                // make the animations restart
                let badTeam = document.getElementById('enemyBlock')
                badTeam.className = 'enemyTeam';

                let goodTeam = document.getElementById('playerBlock')
                goodTeam.className = 'playerTeam';

                setTimeout(() => {
                    this.startBattle();
                }, 2000)
            }
            else if (res === 'newOpponent') {
                //get a new random opponent

                let badTeam = document.getElementById('enemyBlock')
                badTeam.className = 'enemyTeam';

                let goodTeam = document.getElementById('playerBlock')
                goodTeam.className = 'playerTeam';
                
                this.componentDidMount();
                
            }
            else if (res === 'adjustTeam') {
                // go back to team select
                this.redirectToPage();
            }
        })
    }
    redirectToPage = () => {
        //change state so the if statemnt in render method will redirect back to team page
        this.setState({ redirect: true });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/teamselect" />;
        }
        return (
            <div className="teamPreview">
                <header className="App-header">
                    <div className="wrapper clearfix">
                        <div className="logo"><h2>pb&j</h2></div>
                        <h1 className="title">Superhero Battle</h1>
                    </div>
                </header>

                <div className="wrapper clearfix">
                    <section className="playerTeam" id="playerBlock">

                        <h2>{this.props.playerTeam.teamName}</h2>
                        {this.props.playerTeam.teamMember.map((char) => {
                            return (
                                <div className="characterBlock player clearfix" >
                                    <img src={char.img} alt={`${char.name} Snapshot`} />
                                    <h3>{char.name}</h3>
                                </div>
                            )
                        })}
                    </section>
                    {this.state.fightingEnemyTeam === null ? null :
                        <section className="enemyTeam" id="enemyBlock">
                            <h2>{this.state.fightingEnemyTeam.teamName}</h2>
                            {this.state.fightingEnemyTeam.teamMember.map((char) => {
                                return (
                                    <div className="characterBlock enemy clearfix">
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

                        <HomeButton />
                    </section>
                </div>
            </div>
        )
    }
}

export default TeamPreview;