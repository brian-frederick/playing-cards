import React from 'react'
import { graphql } from 'react-apollo'
import createGame from './GraphQL/mutations/CreateGame'
import getGame from './GraphQL/queries/GetGame'
import { css } from 'glamor'

class StartAGame extends React.Component {
    state = {
        type:'',
        stage: '',
        admin: '',
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    startGame = () => {
        const { type, stage, admin } = this.state;
        let url = "/join/";        
        
        this.props.onCreate({
            type,
            stage,
            admin
        }).then((result) => {
            url += result.data.createGame.id
            this.props.history.push(url);
        });
    }

    render() {
        return (
            <div {...css(styles.container)}>
                <input
                    value={this.state.type}
                    onChange={evt => this.onChange('type', evt.target.value)}
                    placeholder='Game Type'
                    {...css(styles.input)}
                />
                <input
                    value={this.state.stage}
                    onChange={evt => this.onChange('stage', evt.target.value)}
                    placeholder='stage'
                    {...css(styles.input)}
                />
                <input
                    value={this.state.admin}
                    onChange={evt => this.onChange('admin', evt.target.value)}
                    placeholder='admin'
                    {...css(styles.input)}
                />
                <button onClick={this.startGame} {...css(styles.button)}>Create Game</button>
            </div>
        )
    }
}


export default graphql(createGame, {
    props: props => ({
        onCreate: game => props.mutate({
            variables: game,
            optimisticResponse: {
                __typename: 'Mutation',
                createGame: { ...game, __typename: 'Game' }
            },
            // update: (proxy, { data: { createGame } }) => {
            //     const data = proxy.readQuery({ query: getGame });
            //     data.getGame = createGame;
            //     proxy.writeQuery({ query: getGame, data });
            // }
        })
    })
})(StartAGame)

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