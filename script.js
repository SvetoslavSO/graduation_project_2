//import { formUsers } from "forms";

const button = document.querySelector(".submit-btn");

const logoutBtn = document.querySelector(".logout-btn");

const user = document.querySelector(".nickname");

const sendBtn = document.querySelector("send__btn");

const welcomePage = document.querySelector(".welcome-page");

const userName = document.querySelector(".user__name");

const usersInChat = document.querySelector(".users__list");

const chat = document.querySelector(".chat__text");

const ws = new WebSocket('ws://localhost:5500')

let currentUser;

/*function getReviewsFromLS() {
    return JSON.parse(localStorage.getItem('nicknames')) || [];
}*/


button.addEventListener('click', (event) => {
    event.preventDefault();
    currentUser = user.value;
    ws.send(JSON.stringify({type: "LOGIN", payload :{userName : currentUser}}));
    userName.innerHTML = `${currentUser}`;
    /*if(!localStorage.nicknames){
        localStorage.nicknames = JSON.stringify([currentUser]);
        ws.send(JSON.stringify({type: "LOGIN", payload :{userName : currentUser}}));
        userName.innerHTML = `${currentUser}`;
        //return
    }else{
        let arr = [...getReviewsFromLS()];
        if(arr.some(element => element === user.value)){
            ws.send(JSON.stringify({type: "LOGIN", payload :{userName : currentUser}}));
            userName.innerHTML = `${currentUser}`; 
            //return
        }else{
            localStorage.nicknames = JSON.stringify([...getReviewsFromLS() , currentUser]);
            ws.send(JSON.stringify({type: "LOGIN", payload :{userName : currentUser}}));
            userName.innerHTML = `${currentUser}`;
            //return
        }
    }*/
    //ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
    /*const request = {
        type: 'LOGOUT',
        payload: {
            userName:user.value
        }
    }
    ws.send(JSON.stringify(request));*/
})

/*sendBtn.addEventListener('click', function(event){
    event.preventDefault();
})*/

/*button.addEventListener('click', function (e) {
    e.preventDefault();
    const request = {
        type: "LOGIN",
        payload:{
            userName:user.value
        }
    }
    ws.send(JSON.stringify(request));
})*/

ws.onmessage = function(message){
    const response = JSON.parse(message.data);
    switch(response.type){
        case "LOGIN_RESPONSE":
            console.log("LOGIN");
            console.log("пользователь подключился");
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
            welcomePage.style.display = "none";
            break;
        case "CONNECT":
            console.log("CONNECT");
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
        case "RELOAD":
            console.log("RECONNECT");
            welcomePage.style.display = "none";
            break
        case "NOTES":
            let text = response.text;
            let newMsg = document.createElement(`div`);
            newMsg.classList.add("chat__msg");
            newMsg.innerHTML = `${text} <br/>`;
            chat.appendChild(newMsg);
            
            break;
        case "LOGOUT_RESPONSE":
            console.log('пользователь отключился');
            break;
        default:
            break
    }
}










