import React from 'react'
import AddPlayer from './AddPlayer'
import JoinedPlayers from './JoinedPlayers'

export default class JoinGame extends React.Component {

    state = {
        gameId: null
    }

    componentDidMount(){
        const { gameId } = this.props.match.params;
        this.setState({gameId: gameId});
    }

    startGame = () => {
        const url = "/play/" + this.state.gameId;
        this.props.history.push(url);
    }

    render () {
        if (!this.state.gameId) { return (<div>shuffling...</div>) }
        else {
            return(
                <div>
                    <AddPlayer gameId={this.state.gameId}/>
                    <JoinedPlayers gameId={this.state.gameId}/>
                    <p>Everybody in?</p>
                    <button onClick={this.startGame} >Let's Play</button>
                </div>
            )
    
        }
    }
}