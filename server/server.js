const WebSocket = require('ws');
const fs = require('fs');
//const { strictEqual } = require('assert');
const wss = new WebSocket.Server({port: 5500});

var userOnServer = [];
let response = {};

wss.on('connection', function connection(ws) {

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
                //const content = JSON.parse(fs.readFileSync("./particapants.json", "utf8"));
                //console.log(content);
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
                break;
        }
    });
})

/*ws.on("close", function closing(ws) {

})*/


