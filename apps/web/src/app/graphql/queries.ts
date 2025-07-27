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

export const GET_CASE = gql`
  query GetCase($id: ID!) {
    case(id: $id) {
      id
      caseType
      destinationCountry
      currentStage
      status
      targetDate
      requirements
      notes
      documents {
        id
        name
        type
        status
      }
      tasks {
        id
        title
        status
        dueDate
      }
    }
  }
`; 