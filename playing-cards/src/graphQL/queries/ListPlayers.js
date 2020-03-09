import gql from 'graphql-tag'

export default gql`
    query listPlayers {
        listPlayers {
            items {
                id
                isAdmin
            }
        }
    }
`