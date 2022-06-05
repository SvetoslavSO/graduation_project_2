const WebSocket = require('ws');
const fs = require('fs');
//const { strictEqual } = require('assert');
const ws = new WebSocket.Server({port: 5500});

let userOnServer = [];
let response = {};

ws.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        const request = JSON.parse(message);
        userOnServer = [...userOnServer, request.payload.userName];
        switch (request.type){
            case 'LOGIN':
                response = {
                    type: 'LOGIN_RESPONSE',
                    payload: {
                        userName:userOnServer
                    }
                }
                fs.writeFileSync("./particapants.json", JSON.stringify(response));
                ws.send(JSON.stringify(response));
                break;
            case 'LOGOUT':
                response = {
                    type: 'LOGOUT_RESPONSE',
                    payload: {
                        userName:userOnServer
                    }
                }
                ws.send(JSON.stringify(response));
                break;
            default:
                console.log('Unknown response');

        }
    });
})

