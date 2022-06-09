
const button = document.querySelector(".submit-btn");

const logoutBtn = document.querySelector(".logout-btn");

const user = document.querySelector(".nickname");

const sendBtn = document.querySelector(".send__btn");

const welcomePage = document.querySelector(".welcome-page");

const userName = document.querySelector(".user__name");

const input = document.querySelector(".chat__input");

const usersInChat = document.querySelector(".users__list");

const chat = document.querySelector(".chat__text");

const ws = new WebSocket('ws://localhost:5500')

let currentUser;


button.addEventListener('click', (event) => {
    event.preventDefault();
    currentUser = user.value;
    ws.send(JSON.stringify({type: "LOGIN", payload :{userName : currentUser}}));
    userName.innerHTML = `${currentUser}`;
    user.value = ''
})

sendBtn.addEventListener('click', function(event){
    event.preventDefault();
    var chatInput = input.value
    ws.send(JSON.stringify({type: "MESSAGE", payload:{userName:`${currentUser}`},text :`${chatInput}`}));
    input.value = ''
})

logoutBtn.addEventListener('click', function(event){
    event.preventDefault();
    ws.send(JSON.stringify({type: "LOGOUT", payload:{userName:`${currentUser}`}}));
})

ws.onclose = function(){
    welcomePage.style.display = "flex";
}


ws.onmessage = function(message){
    const response = JSON.parse(message.data);
    switch(response.type){
        case "LOGIN_RESPONSE":
            let arr = [];
            arr = response.usersAll;
            for (let iterator in arr) {
                let newClient = document.createElement(`li`);
                newClient.innerHTML = 
                `
                    <div class="user__profile">
                        <div class="user__photo">
                            <img src="./pictures/photo.svg" alt="" class="user__img">
                        </div>
                        <div class="user__name">${arr[iterator]}</div>
                    </div>
                `
                usersInChat.appendChild(newClient);
            }
            welcomePage.style.display = "none";
            break;
        case "CONNECT":
            usersInChat.innerHTML = '';
            let array = []
            console.log(response.usersAll);
            array = response.usersAll
            for (let iterator in array) {
                let client = document.createElement(`li`);
                client.innerHTML = 
                `
                    <div class="user__profile">
                        <div class="user__photo">
                            <img src="./pictures/photo.svg" alt="" class="user__img">
                        </div>
                        <div class="user__name">${array[iterator]}</div>
                    </div>
                `
                usersInChat.appendChild(client);
            }
        case "RECONNECT":
            welcomePage.style.display = "none";
            let ar = [];
            usersInChat.innerHTML = '';
            ar = response.usersAll
            for (let iterator in ar) {
                let client = document.createElement(`li`);
                client.innerHTML = 
                `
                    <div class="user__profile">
                        <div class="user__photo">
                            <img src="./pictures/photo.svg" alt="" class="user__img">
                        </div>
                        <div class="user__name">${ar[iterator]}</div>
                    </div>
                `
                usersInChat.appendChild(client);
            }
            break
        case "NOTES":
            let text = response.text;
            let newMsg = document.createElement(`div`);
            newMsg.classList.add("chat__msg");
            newMsg.innerHTML = 
            `
                <div class="new-client-msg">${text}</div>
            `;
            chat.appendChild(newMsg);
            break;
        case "MESSAGE":
            let msg = response.text;
            let author = response.payload.userName;
            var d = new Date();
            let time = d.toLocaleTimeString();
            let newMessage = document.createElement('div');
            newMessage.classList.add("chat__msg");
            newMessage.innerHTML = 
            `
                <div class="user__photo">
                    <img src="./pictures/photo.svg" alt="" class="avatar">
                </div>
                <div class="text__content">
                    <div class="author-n-msg">
                        <div>${author}</div>
                        <div>${msg}</div>
                    </div>
                    <div class="date">${time}</div>
                </div>
            `;
            chat.appendChild(newMessage);
            break
        case "LOGOUT_RESPONSE":
            console.log('пользователь отключился');
            break;
        default:
            break
    }
}










