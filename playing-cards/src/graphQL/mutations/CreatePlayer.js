import gql from 'graphql-tag'

export default gql`
    mutation createPlayer(
        $id: String!,
        $isAdmin: Boolean!,
        $gameId: String!,
    ) {
        createPlayer(input: {
            id: $id, gameId: $gameId, isAdmin: $isAdmin 
        }) {
            id,
            isAdmin
        }
    }
`