

function login(){
    joinChat(document.getElementById("username").value);
}
function onLoginComplete(){
    console.log("logincomplete");
    document.getElementById("login-bg").remove();
    document.getElementById("main-bg").style.visibility = "inherit";
}
function send(){
    sendMsg(document.getElementById("message").value);
}
function displayNewMessage(msg){
    document.getElementById("messages-list").innerHTML += "<br>" + msg;
}
function DisplayUserlist(users){
    document.getElementById("users-card").innerHTML = "";
    users.forEach(element => {
        AddUser(element);
    });
}
function AddUser(user){
    document.getElementById("users-card").innerHTML += "<br>" + user;
}
function RemoveUser(user){
    let i = document.getElementById("users-card").innerHTML.indexOf("<br>" + user);
    let l = document.getElementById("users-card").innerHTML.length;
    document.getElementById("users-card").innerHTML = document.getElementById("users-card").innerHTML.slice(0, i) + document.getElementById("users-card").innerHTML.slice(i + user.length + 4, l);
}