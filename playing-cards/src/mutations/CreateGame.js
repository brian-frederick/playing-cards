import gql from 'graphql-tag'

export default gql`
    mutation createGame(
        $type: String!,
        $stage: String!,
        $admin: String!
    ) {
        createGame(input: {
            type: $type, stage: $stage, admin: $admin
        }) {
            id
            type
            stage
            admin
        }
    }
`