import { createContext, useState, useContext, useEffect } from "react";
import { message } from 'antd'
const client = new WebSocket('ws://localhost:4000');

const useChat = () => useContext(ChatContext);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startMessage: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: () => {},
});

const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);
    
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                //console.log(payload);
                setMessages(payload);
                break;
            }
            case "output": {
                //console.log(payload);
                setMessages(() => [...payload]);
                break;
            }
            case "status": {
                displayStatus(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: 
                break;
        }
    }

    const sendData = async (data) => {
        //console.log(data);
        await client.send(JSON.stringify(data));
    };

    const startMessage = (payload) => {
        sendData(["Chat", payload]);
    }

    const sendMessage = (payload) => {
        sendData(["Message", payload]);
    }

    const clearMessages = () => {
        sendData(["Clear"]);
    };

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
                status, me, signedIn, messages, setMe, setSignedIn,
                startMessage, sendMessage, clearMessages, displayStatus
            }}
            {...props}
        />
    );
};

export { ChatProvider, useChat };

/*
import { useState } from "react";

const client = new WebSocket('ws://localhost:4000');

const useChat = () => {
    
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                setMessages(payload);
                break;
            }
            case "output": {
                setMessages(() =>
                [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: 
                break;
        }
    }
    
    const sendMessage = (payload) => {
        sendData(["input", payload]);
    }

    const clearMessages = () => {
        sendData(["clear"]);
    };

    return {
        status, messages, sendMessage, clearMessages
    };
};
export default useChat;
*/