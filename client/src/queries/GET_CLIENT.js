import { gql } from "@apollo/client";

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENT };
