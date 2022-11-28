import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults'; 
import mongoose from 'mongoose';
import WebSocket from 'ws'
import mongo from './mongo'
import wsConnect from './wsConnect'
import { ChatBoxModel, MessageModel } from '../models/message';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once('open', async () => {
    console.log("MongoDB connected!");
    //await MessageModel.deleteMany({});
    //await ChatBoxModel.deleteMany({});
    wss.on('connection', (ws) => {
        ws.box = '';
        //wsConnect.initData(ws);
    // Define WebSocket connection logic
        ws.onmessage = wsConnect.onMessage(wss, ws);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {  });