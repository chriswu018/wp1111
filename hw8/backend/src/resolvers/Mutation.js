import { ChatBoxModel } from "../models/chatbox"

const checkOutChatBox = async (name1, name2) => {
  const chatBoxName = makeName(name1, name2);
  const box = await ChatBoxModel.findOne({ name: chatBoxName })
  if( box === null){
      const newbox = new ChatBoxModel({ name: chatBoxName, messages: [] });
      try { await newbox.save();
        console.log('chatBox created');
      } catch (e) { throw new Error ("chatBox DB created error: " + e); }
      return newbox
  }else{
      return box
  }
}

const makeName = (name, to) => {
  const chatBoxName = [name, to].sort().join('_');
  return chatBoxName;
}

const Mutation = {
  createChatBox: (parent, { name1, name2 } ) => {
    return checkOutChatBox(name1, name2);
  },
  createMessage: async (parent, { name, to, body }, { pubsub } ) => {
    const chatBox = await checkOutChatBox(name, to);
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();

    const chatBoxName = makeName(name, to);
    pubsub.publish(`chatBox ${chatBoxName}`, {
    message: newMsg,
    });
    return newMsg;
  },
};

export { Mutation as default };
