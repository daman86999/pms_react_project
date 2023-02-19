import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    addClient(name: $name, email: $email, phone: $phone, password: $password) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_CLIENT };
