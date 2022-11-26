import mongoose from 'mongoose';

const Schema = mongoose.Schema

/******* User Schema *******/
/*
const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});
const UserModel = mongoose.model('User', UserSchema);
*/
/******* Message Schema *******/
const MessageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
    sender: { type: String, required: [true, 'Name field is required.'] },
    body: { type: String, required: [true, 'Body field is required.'] },
});
const MessageModel = mongoose.model('Message', MessageSchema);

/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);


// Exporting table for querying and mutating
export { MessageModel, ChatBoxModel};