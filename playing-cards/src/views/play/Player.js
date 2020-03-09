import React from 'react'
import Hand from './Hand'

export default class Player extends React.Component {
    render(){
        return (
            <div>
                <p>{this.props.player.id}</p>
                <Hand hand={this.props.player.hand} />
            </div>
        )
    }
}