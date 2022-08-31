const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const messageSend = document.getElementById('send-button');

const userName = prompt('What is your name?')
appendMessage(`${userName} joined chat.`)
socket.emit('new-user', userName)

socket.on('chat-message', data => {
    console.log('chat-message',data);
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', userName => {
    console.log('user-connected',userName);
    appendMessage(`${userName} connected`);
})

socket.on('user-disconnected', userName => {
    console.log('user-disconnected',userName);
    appendMessage(`${userName} disconnected`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
})

messageSend.addEventListener('click', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement)
}