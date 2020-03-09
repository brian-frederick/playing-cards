import React from 'react'
import { css } from "glamor"
import { graphql } from 'react-apollo'
import ListPlayers from './graphQL/queries/ListPlayers'
import AddPlayer from './AddPlayer';
import NewPlayerSubscription from './graphQL/subscriptions/NewPlayerSubscription'

class JoinedPlayers extends React.Component {
    componentWillMount(){
        this.props.subscribeToNewPlayers();
    }
    
    render(){
        return (
            <div {...css(styles.container)}>
                <h2>Ready to play...</h2>
                {
                    this.props.players.map((p, i) => (
                        <p key={i}>{p.id}</p>
                    ))
                }
            </div>
        )
    }
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 100,
      paddingRight: 100,
      textAlign: 'left'
    }
  }

  export default graphql(ListPlayers, {
      options: {
          fetchPolicy: 'cache-and-network'
      },
      props: props => ({
          players: props.data.listPlayers ? props.data.listPlayers.items : [],
          subscribeToNewPlayers: params => {
              props.data.subscribeToMore({
                  document: NewPlayerSubscription,
                  updateQuery: (prev, {subscriptionData: { data : { onCreatePlayer }}}) => {
                return {
                    ...prev,
                    listPlayers: {
                        __typename: 'PlayerConnection',
                        items: [onCreatePlayer, ...prev.listPlayers.items.filter(player => player.id !== onCreatePlayer.id)]
                    }
                }
              }
            })
          }
        })
      })(JoinedPlayers)