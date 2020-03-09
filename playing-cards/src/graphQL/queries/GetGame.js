import gql from 'graphql-tag'

export default gql`
    query getGame($id: ID!) {
        getGame(id: $id) {
            id
            type
            stage
            admin
            players {
                id
                isAdmin
                hand {
                    id
                    suit
                    denom
                }
            }
        }
    }
`