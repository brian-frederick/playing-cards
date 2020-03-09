import React from 'react'
import { graphql } from 'react-apollo'
import GetGame from '../graphQL/queries/GetGame'
import Player from './Player'

export const Play = ({ data: { loading, getGame } }) =>  (

    <div>
        {loading && <div>shufflng</div>}

        {!loading && 
            <div>
            <p>Let's play {getGame.type}</p>
            <button onClick={() => {getGame.players[0].hand.push(getGame.players[1].hand[0])}} >Simulate Socket Event</button>

            {
                getGame.players.map((p, i) => (
                    <Player key={i} player={p} />
                ))
            }
            </div>
        }
    </div>
)


function simulate(players){
    console.log("firing simulate");
    players[0].hand.push(players[1].hand[1])
}

export default graphql(GetGame,  {
    options: (props) => ({
        variables: {id: props.match.params.gameId}})
})(Play);