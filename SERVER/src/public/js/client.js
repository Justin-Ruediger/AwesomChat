const socket = io();
socket.on('messageback', msg => {
    displayNewMessage(msg[0] + ": " + msg[1]);
})
socket.on('logincomplete', () => {
    onLoginComplete();
})
socket.on('allusers', users => {
    DisplayUserlist(users);
});
socket.on('userjoined', user => {
    AddUser(user);
    displayNewMessage("[" + user + " joined the chat]");
})
socket.on('userleft', user => {
    RemoveUser(user);
    displayNewMessage("[" + user + " left the chat]");
})
function joinChat(username) {
    socket.emit('join', username)
}
function sendMsg(message) {
    socket.emit('message', message)
}


