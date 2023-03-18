
const socket = io();


const textarea = document.querySelector(".textarea");
const messageArea = document.querySelector(".messageArea");

console.log(messageArea.scrollTop, messageArea.scrollHeight);

if (messageArea) {
    messageArea.scrollTop = messageArea.scrollHeight;
}

let name;

do {
    name = prompt("Enter your name");
} while (!name)



textarea.addEventListener('keyup', (event) => {

    const msg = {
        user: name,
        message: (event.target.value).trim()
    }

    if (event.key === "Enter" && msg.message.length > 1) {
        sendMessage(msg);
    }

})

function sendMessage(msg) {

    // append
    appendMessage(msg, "outgoing");

    // send

    socket.emit('message', msg);

}

function scrollBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

function appendMessage(msg, type) {


    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", type);

    msgDiv.innerHTML = `<h4>${msg.user}</h4>
    <p> ${msg.message}</p>`;

    messageArea.appendChild(msgDiv);

    textarea.value = "";

    scrollBottom();

}