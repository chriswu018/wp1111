import {useChat} from './containers/hooks/useChat'
import ChatRoom from './containers/ChatRoom'
import SignIn from './containers/SingIn'
import styled from 'styled-components'
import { useEffect } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const { status, signedIn, displayStatus } = useChat()
  useEffect(() => {displayStatus(status)}, [status, displayStatus])
  return (
    <Wrapper> {signedIn? <ChatRoom />: <SignIn />} </Wrapper>
  )
}

export default App