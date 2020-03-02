import gql from 'graphql-tag'

export default gql`
    query getGame {
        getGame {
            game {
                id
                type
                state
                admin
            }
        }
    }
`