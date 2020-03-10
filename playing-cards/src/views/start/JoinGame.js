import React from 'react'
import queryString from 'query-string'

import AddPlayer from './AddPlayer'
import JoinedPlayers from './JoinedPlayers'

export default class JoinGame extends React.Component {
    state = {
        gameId: null,
        isAdmin: false,
    }

    componentDidMount(){
        this.setAdminStatus();
        this.setState({ gameId: this.props.match.params.gameId });
    }

    startGame = () => {
        const url = "/play/" + this.state.gameId;
        this.props.history.push(url);
    }

    setAdminStatus = () => {
        const queryStrings = queryString.parse(this.props.location.search);
        console.log("query strings >")
        console.log(queryStrings);
        if (queryStrings.isAdmin) {
            this.setState({isAdmin: true}) 
        };
    }

    render () {
        if (!this.state.gameId) { return (<div>shuffling...</div>) }
        else {
            return(
                <div>
                    <AddPlayer gameId={this.state.gameId} isAdmin={this.state.isAdmin}/>
                    <JoinedPlayers gameId={this.state.gameId} />
                    <p>Everybody in?</p>
                    <button onClick={this.startGame} >Let's Play</button>
                </div>
            )
    
        }
    }
}