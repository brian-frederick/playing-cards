import React from 'react'

export default class Hand extends React.Component {
    render(){
        return (
            <ul>
                {
                    this.props.hand.map((card, i) => (
                        <div key={i}>|{card.id}|</div>
                    ))
                }
            </ul>
        )
    }
}