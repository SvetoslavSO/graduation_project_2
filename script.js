const button = document.querySelector(".submit-btn");

const logoutBtn = document.querySelector(".logout-btn");

const user = document.querySelector(".nickname");

const welcomePage = document.querySelector(".welcome-page");

const userName = document.querySelector(".user__name") ;

const ws = new WebSocket('ws://localhost:5500')

let currentUser;

/*function getReviewsFromLS() {
    return JSON.parse(localStorage.getItem('nicknames')) || [];
}*/

logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const request = {
        type: 'LOGOUT',
        payload: {
            userName:user.value
        }
    }
    ws.send(JSON.stringify(request));
})

button.addEventListener('click', function (e) {
    e.preventDefault();
    const request = {
        type: "LOGIN",
        payload:{
            userName:user.value
        }
    }
    ws.send(JSON.stringify(request));
    //ws.send(JSON.stringify({type: "LOGIN"}));
    /*if(!localStorage.nicknames){
        localStorage.nicknames = JSON.stringify([user.value]);
        currentUser = user.value
        ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
        return
    }else{
        let arr = [...getReviewsFromLS()];
        if(arr.some(element => element === user.value)){
            currentUser = user.value;
            ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
            return
        }else{
            localStorage.nicknames = JSON.stringify([...getReviewsFromLS() , user.value]);
            currentUser = user.value;
            ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
            return
        }
    }*/
})

ws.onmessage = function(message){
    let response = JSON.parse(message);
    switch(response.type){
        case "LOGIN_RESPONSE":
            welcomePage.style.left = "-9999px";
            userName.innerHTML = `${response.payload.userName}`;
            break;
        case "LOGOUT_RESPONSE":
            console.log("отключение");
            break;
    }
}







function addMember(){
    //принимает нового пользователя добавленного в хранилище, добавляет его в список участников и выводит сообщение в чат
}



