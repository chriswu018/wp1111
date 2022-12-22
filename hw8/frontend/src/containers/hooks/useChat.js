import { createContext, useState, useContext, useEffect } from "react";
import { message } from 'antd'
import { useMutation, useLazyQuery } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";


const useChat = () => useContext(ChatContext);

const ChatContext = createContext({
    status: {},
    displayStatus: () => {},
    me: "",
    setMe: ()=>{},
    friend: "",
    setFriend:()=>{},
    signedIn: false,
    setSignedIn: ()=>{},
    messages: [],
    setMessages:()=>{},
    sendMessage: ()=>{},
    startChat: ()=>{},
});

var unSub = ()=>{};
const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState("");

    const [getChat, { data, loading, subscribeToMore, refetch }] = useLazyQuery(CHATBOX_QUERY);
    
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    //console.log("data", data)
/*
    const asfunc = async() => {
        console.log("st Update");
        const chatBoxName = [me, friend].sort().join('_');
        await getChat({ variables : {name: chatBoxName}});
        console.log("fi Update");
        if(data) {
            console.log("havedata", data)
            setMessages(data.chatbox.messages);
        }
    }*/
    useEffect(() => {
        const chatBoxName = [me, friend].sort().join('_');
        refetch({name: chatBoxName});
        if(friend !== ""){
            getChat({ variables : {name: chatBoxName}});
            unSub();
            unSub = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    const tmp = Object.assign({},prev.chatBox,{
                        name: chatBoxName,
                        messages: [...prev.chatbox.messages, newMessage],
                    })
                    const result = Object.assign({},prev,{
                        chatbox: tmp,
                    })
                    return result;
                },
            });
            //console.log("data", data);
            //setMessages(data.chatbox.messages);
        }else{
            console.log(me," no friend")
        }
    }, [friend, subscribeToMore]);

    useEffect(()=>{
        if(data){
            setMessages(data?.chatbox.messages);
            console.log("Msg set");
        }
    },[data])

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    const displayStatus = (s) => {
        if (s.msg) {
          const { type, msg } = s;
          const content = { content: msg, duration: 0.5 }
          switch (type) {
            case 'success':
              message.success(content);
              break;
            case 'error':
            default:
              message.error(content);
              break;
          }
        }
    }
    

    return (
        <ChatContext.Provider
            value={{
                status, displayStatus, me, setMe, friend, setFriend,
                signedIn, setSignedIn, messages, setMessages,
                sendMessage, startChat, data
            }}
            {...props}
        />
    );
};

export { ChatProvider, useChat };
