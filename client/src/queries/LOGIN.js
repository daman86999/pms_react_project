import { gql } from "@apollo/client";

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      tokenExpiration
    }
  }
`;

export { LOGIN };
