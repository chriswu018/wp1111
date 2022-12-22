import { gql } from '@apollo/client';

const CHATBOX_QUERY = gql`
query chatbox($name: String!){
  chatbox(name: $name){
    name
    messages {
      sender
      body
    }
  }
}
`;

export {CHATBOX_QUERY}
