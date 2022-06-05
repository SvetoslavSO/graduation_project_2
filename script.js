const button = document.querySelector(".submit-btn");

const logoutBtn = document.querySelector(".logout-btn");

const user = document.querySelector(".nickname");

const welcomePage = document.querySelector(".welcome-page");

const userName = document.querySelector(".user__name") ;

const ws = new WebSocket('ws://localhost:5500')

let currentUser;


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










