import React from 'react'
import { graphql } from 'react-apollo'
import { css } from 'glamor'

import CreatePlayer from '../../graphQL/mutations/CreatePlayer'
import ListPlayers from '../../graphQL/queries/ListPlayers'

class AddPlayer extends React.Component {
    state = {
        id: '',
        playerAdded: false,
    }
    
    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    joinGame = () => {

        const { id } = this.state;
        const gameId = this.props.gameId;
        const isAdmin = this.props.isAdmin;

        this.props.onAdd({
            id,
            isAdmin,
            gameId
        });

        this.setState({playerAdded: true});
    }

    render(){
        return (
            <div>
                { !this.state.playerAdded &&
                    <div {...css(styles.container)}>
                        <input
                            value={this.state.name}
                            onChange={evt => this.onChange('id', evt.target.value)}
                            placeholder='Name'
                            {...css(styles.input)}
                        />
                        <button onClick={this.joinGame} {...css(styles.button)}>Join Game</button>
                    </div>
                }
            </div>
        )
    }
}

export default graphql(CreatePlayer, {
    props: props => ({
        onAdd: player => props.mutate({
            variables: player,
            optimisticResponse: {
                __typename: 'Mutation',
                createPlayer: { ...player, __typename: 'Player'}
            },
            update: (proxy, { data: { createPlayer } }) => {
                const data = proxy.readQuery({ query: ListPlayers });
                data.listPlayers.items.push(createPlayer);
                proxy.writeQuery({ query: ListPlayers, data });
            }    
        })
    })
})(AddPlayer)

const styles = {
    button: {
        border: 'none',
        background: 'rgba(0,0,0, .1)',
        width: 250,
        height: 'pointer',
        margin: '15px 0px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '100',
        paddingRight: '100',
        textAlign: 'left'
    },
    input: {
        outline: 'none',
        border: 'none',
        borderBottom: '2px solid #00dd3b',
        height: '44px',
        fontSize: '18px'
    }
}