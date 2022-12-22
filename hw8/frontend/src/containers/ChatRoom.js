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

var key0 = "";

const ChatRoom = () => {
  const { me, messages, setMessages, friend, setFriend, startChat, sendMessage, displayStatus, data } = useChat()
  const [body, setBody] = useState('')
  const [msgSent, setMsgSent] = useState(false)
  const [chatBoxes, setChatBoxes] = useState([])
  //const [activeKey, setActiveKey] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const bodyRef = useRef(null)
  const msgFooter = useRef(null)

  const scrollToBottom = () => {
    //console.log("scroll")
    msgFooter.current = document.getElementById(`footer${friend}`)
    msgFooter.current?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  useEffect(() => {
    //console.log("MsgSent", msgSent)
    //if(msgSent) scrollToBottom();
    setMsgSent(false);
    scrollToBottom();
  }, [msgSent, chatBoxes]);

  useEffect(() => {
    msgFooter.current = document.getElementById(`footer${friend}`)
    //console.log("MsgChange")
    if (chatBoxes.some(({key}) => key === friend)) {
      const chat = renderChat(messages);
      const index = chatBoxes.findIndex(({key}) => key === friend);
      chatBoxes[index].children =  chat;
    }
    setMsgSent(true);
  }, [messages]);

  const renderChat = (chat) => {
    //console.log("render")
    return (
    <Scroll>
      {chat.length === 0 
      ?
      (<p style={{ color: '#ccc' }}> No messages... </p>)
      : 
      (chat.map(({sender, to, body}) => (
        <Message isMe = {sender===me?true:false} message = {body} />
      )))}
      <FootRef id={`footer${friend}`} ref={msgFooter} />
    </Scroll>)
  }

  const createChatBox = (friend) => {
    console.log("create");
    if (chatBoxes.some
    (({key}) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const chat = renderChat(messages);
    setChatBoxes([...chatBoxes,
    { label: friend, children: chat, key: friend }]);
    return friend;
  };

  const removeChatBox = (targetKey, friend) => {
    const index = chatBoxes.findIndex(({key}) => key === friend);
    const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    return(
      friend ? 
      friend === targetKey ? 
          (index === 0 ? '' : chatBoxes[index - 1].key)
        : friend
      : ''
    );
  };

  return (
    <Wrapper>
      <Title name = {me}></Title>
      <ChatBoxesWrapper
        onChange={async (key) => {
          key0 = key;
          setFriend(key);
          await startChat({variables: {name1: me, name2: key}});
          console.log("onChange")
        }}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            key0 = removeChatBox(targetKey, friend)
            setFriend(key0);
          }
        }}
        items={chatBoxes}
        type="editable-card"
        activeKey={key0}
      >
      </ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={async ({ name }) => {
          key0 = name;
          console.log("c");
          setFriend(createChatBox(name));
          await startChat({variables: {name1: me, name2: name}});
          console.log("e");
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
        }else if(friend === ''){
          displayStatus({
            type: 'error',
            msg: 'Please create a chat box.'
          })
          return
        }
        try{
          sendMessage({variables:{ name: me, to: friend, body: msg }})
        }catch (e){
          console.error(e)
        }
        setBody('')
        }}
      ></Input.Search>
    </Wrapper> 
  )
}

export default ChatRoom