const button = document.querySelector(".submit-btn");

const logoutBtn = document.querySelector(".logout-btn");

const user = document.querySelector(".nickname");

const sendBtn = document.querySelector("send__btn");

const welcomePage = document.querySelector(".welcome-page");

const userName = document.querySelector(".user__name") ;

const ws = new WebSocket('ws://localhost:5500')

let currentUser;

function getReviewsFromLS() {
    return JSON.parse(localStorage.getItem('nicknames')) || [];
}


button.addEventListener('click', (event) => {
    event.preventDefault();
    //ws.send(JSON.stringify({type: "LOGIN"}));
    if(!localStorage.nicknames){
        localStorage.nicknames = JSON.stringify([user.value]);
        currentUser = user.value;
        ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
        userName.innerHTML = `${currentUser}`;
        //welcomePage.style.left = "-9999px";      
        return
    }else{
        let arr = [...getReviewsFromLS()];
        if(arr.some(element => element === user.value)){
            currentUser = user.value;          
            ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
            userName.innerHTML = `${currentUser}`; 
            //welcomePage.style.left = "-9999px";
            return
        }else{
            localStorage.nicknames = JSON.stringify([...getReviewsFromLS() , user.value]);
            currentUser = user.value;
            ws.send(JSON.stringify({type: "LOGIN", payload :{userName : user.value}}));
            userName.innerHTML = `${currentUser}`;
            //welcomePage.style.left = "-9999px";
            return
        }
    }

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
    ws.send(text);
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
    console.log(response);
    switch(response.type){
        case "LOGIN_RESPONSE":
            welcomePage.style.left = "-9999px";
            console.log("пользователь подключился")
            break;
        case "LOGOUT_RESPONSE":
            console.log('пользователь отключился');
            break;
    }
}










