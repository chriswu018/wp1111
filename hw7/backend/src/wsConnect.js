import {MessageModel, ChatBoxModel} from '../models/message';

const chatBoxes = {};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

export default {
    /*
    initData: (ws) => {
        Message.find().sort({ created_at: -1 }).limit(100)
        .exec((err, res) => {
            if (err) throw err;
            // initialize app with existing messages
            sendData(["init", res], ws);
        });
    },*/
    onMessage: (wss, ws) => (
        async (byteString) => {

            const { data } = byteString;
            const [task, payload] = JSON.parse(data);

            switch (task) {
                case 'Chat': {
                    if (ws.box !== "" && chatBoxes[ws.box]) chatBoxes[ws.box].delete(ws);

                    const { name, to, body } = payload;
                    const chatBoxName = [name, to].sort().join('_');
                    ws.box = chatBoxName;
                    if (!chatBoxes[chatBoxName]) {
                        chatBoxes[chatBoxName] = new Set();
                    }
                    const exist = await ChatBoxModel.findOne({ name: chatBoxName })
                    if( exist === null){
                        console.log('chatBox start create');
                        const box = new ChatBoxModel({ name: chatBoxName, messages: [] });
                        try { await box.save();
                            console.log('chatBox created');
                        } catch (e) { throw new Error ("chatBox DB created error: " + e); }
                    }else{
                        console.log('chatBox exist');
                    }

                    chatBoxes[chatBoxName].add(ws);
                    console.log('newbox',chatBoxName)
                    let box2 = await ChatBoxModel.findOne({ name: chatBoxName });
                    let msg = (await box2.populate('messages'));
                    console.log(msg.messages);
                    sendData(["init", msg.messages], ws);
                    sendStatus({
                        type: 'success',
                        msg: 'Start Chat.'
                    }, ws);
                    break;
                }
                case 'Message': {
                    const { name, to, message } = payload;
                    const chatBoxName = [name, to].sort().join('_');
                    let box = await ChatBoxModel.findOne({ name: chatBoxName });

                    let msg = new MessageModel({ ChatBox: box, sender: name, body: message });
                    try { await msg.save();
                        console.log('message saved');
                    } catch (e) { throw new Error ("message DB send error: " + e); }

                    await ChatBoxModel.updateOne(
                        {name : chatBoxName},
                        {messages: [...box.messages, msg]}
                    )
                    
                    box = await ChatBoxModel.findOne({ name: chatBoxName });
                    msg = (await box.populate('messages')).messages;

                    chatBoxes[chatBoxName].forEach((ws) => {
                        sendData(["output", msg], ws);
                    });

                    sendStatus({
                        type: 'success',
                        msg: 'Message Sent.'
                    }, ws);
                    break;
                }
                case 'Clear': {
                    Message.deleteMany({}, () => {
                        sendData(['cleared'], ws)
                        sendStatus({ type: 'info', msg: 'Message cache cleared.'}, ws)
                    })
                    break;
                }
                default: 
                    break
            }
        }
    )
    
}