import React from 'react'
import { graphql } from 'react-apollo'
import GetGame from '../../graphQL/queries/GetGame'
import Player from './Player'

export const Play = ({ data: { loading, getGame } }) =>  (

    <div>
        {loading && <div>shufflng</div>}

        {!loading && 
            <div>
            <p>Let's play {getGame.type}</p>

            {
                getGame.players.map((p, i) => (
                    <Player key={i} player={p} />
                ))
            }
            </div>
        }
    </div>
)

export default graphql(GetGame,  {
    options: (props) => ({
        variables: {id: props.match.params.gameId}})
})(Play);