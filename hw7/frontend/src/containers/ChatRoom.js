import { useState, useEffect, useRef } from 'react'
import { Input, Tag, Tabs } from 'antd'
import {useChat} from './hooks/useChat'
import Title from '../components/Title'
import styled from 'styled-components'
import ChatModal from '../components/ChatModal'
import Message from '../components/Message'

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 350px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const Scroll = styled.div`
    width: 100%;
    height: 250px;
    overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
  const { me, messages, startMessage, sendMessage, displayStatus } = useChat()
  const [body, setBody] = useState('')
  const [msgSent, setMsgSent] = useState('')
  const [chatBoxes, setChatBoxes] = useState([])
  const [activeKey, setActiveKey] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const bodyRef = useRef(null)
  const msgFooter = useRef(null)

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
    ({ behavior: 'smooth', block: "start" });
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {

    if (chatBoxes.some(({key}) => key === activeKey)) {
      const chat = renderChat(messages);
      const index = chatBoxes.findIndex(({key}) => key === activeKey);
      chatBoxes[index].children =  chat;
    }
    setMsgSent(true);
  }, [messages]);

  const renderChat = (chat) => {
    return (
    <Scroll>
      {chat.length === 0 
      ?
      (<p style={{ color: '#ccc' }}> No messages... </p>)
      : 
      (chat.map(({sender, body}) => (
        <Message isMe = {sender===me?true:false} message = {body} />
      )))}
      <FootRef ref={msgFooter} />
    </Scroll>)
  }
  
  const extractChat = (friend) => {
    return renderChat(messages)
  }

  const createChatBox = (friend) => {
    if (chatBoxes.some
    (({key}) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    startMessage({ name: me, to: friend, body: body });
    const chat = extractChat(friend);
    setChatBoxes([...chatBoxes,
    { label: friend, children: chat,
    key: friend }]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({key}) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    return(
      activeKey ? 
        activeKey === targetKey ? 
          (index === 0 ? '' : chatBoxes[index - 1].key)
        : activeKey
      : ''
    );
  };

  return (
    <Wrapper>
      <Title name = {me}></Title>
      <ChatBoxesWrapper
        onChange={(key) => {
          setActiveKey(key);
          extractChat(key);
          startMessage({ name: me, to: key, body: body });
        }}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
        type="editable-card"
        activeKey={activeKey}
      >
      </ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          extractChat(name);
          setModalOpen(false);
        }}
        onCancel={() => { setModalOpen(false);}}
      />
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
        if (!msg) {
          displayStatus({
            type: 'error',
            msg: 'Please enter a message body.'
          })
          return
        }else if(activeKey === ''){
          displayStatus({
            type: 'error',
            msg: 'Please create a chat box.'
          })
          return
        }
        sendMessage({ name: me, to: activeKey, message: msg })
        setBody('')
        }}
      ></Input.Search>
    </Wrapper> 
  )
}

export default ChatRoom