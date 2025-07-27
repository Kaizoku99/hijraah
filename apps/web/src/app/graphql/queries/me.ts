import { gql } from 'react-query';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      firstName
      lastName
      status
      emailVerified
      cases {
        id
        caseType
        status
      }
    }
  }
`; 