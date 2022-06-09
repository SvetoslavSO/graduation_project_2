const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 5500});
var clients = {};
var userOnServer = [];
let response = {};

wss.on('connection', function connection(ws) {
    //var id = Math.random();
    ws.on('message', function incoming(message) {
        const request = JSON.parse(message);
        switch (request.type){
            case 'LOGIN':
                var id = request.payload.userName
                if(clients[id]){
                    clients[id] = {
                        socket: ws,
                        clientDetails:{
                            userName : request.payload.userName
                        }
                    }
                    response = {
                        type: 'RECONNECT',
                        payload: {
                            userName:request.payload.userName
                        },
                        usersAll : userOnServer,
                        text:''
                    }
                    clients[id].socket.send(JSON.stringify(response));
                } else if(!clients[id]){
                    clients[id] = {
                        socket: ws,
                        clientDetails:{
                            userName : request.payload.userName
                        }
                    }
                    userOnServer.push(request.payload.userName)
                    response = {
                        type: 'CONNECT',
                        payload: {
                            userName:request.payload.userName
                        },
                        usersAll : userOnServer,
                        text:''
                    }
                    for(var key in clients){
                        if(key === id){
                            response.type = 'LOGIN_RESPONSE'
                            clients[key].socket.send(JSON.stringify(response))
                            for(var counter in clients){
                                response.type = 'NOTES'
                                response.text = `${response.payload.userName} подключился к чату`
                                clients[counter].socket.send(JSON.stringify(response))
                            }
                        }
                        else{
                            response.type = 'CONNECT'
                            clients[key].socket.send(JSON.stringify(response))
                        }
                    }
                }
                break;
            case "NOTE":
                response.type = "NOTES";
                response.text = request.text;
                console.log(request.text);
                for (var key in clients) {
                    clients[key].socket.send(JSON.stringify(response))
                }
                break
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
/*if(userOnServer.some(element => element === request.payload.userName)){
    userOnServer = userOnServer;
} else{
    userOnServer = [...userOnServer, request.payload.userName];
}*/

//console.log(userOnServer);

//fs.writeFileSync("./particapants.json", JSON.stringify(response));
//const content = JSON.parse(fs.readFileSync("./particapants.json", "utf8"));
//console.log(content);
/*for(const user of userOnServer){
    response = {
        type: 'LOGIN_RESPONSE',
        payload: {
            userName:user
        }
    }
    
    ws.send(JSON.stringify(response));
}*/

            
//ws.send(JSON.stringify(response));

/*ws.clients.forEach(client => {
    if(client!== sender){
        client.send(response)
    }
});*/