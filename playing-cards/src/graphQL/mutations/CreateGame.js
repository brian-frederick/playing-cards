import gql from 'graphql-tag'

export default gql`
    mutation createGame(
        $type: String!,
        $stage: String!,
    ) {
        createGame(input: {type: $type, stage: $stage }) {
            id
            type
            stage
            admin
        }
    }
`