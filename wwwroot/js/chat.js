class Message {
    constructor(username, text, when) {
        this.userName = username;
        this.text = text;
        this.when = when;
    }
}

const username = userName; // Bu değer razor sayfasında tanımlanıyor.
const textInput = document.getElementById('messageText');
const chat = document.getElementById('chat');
const messagesQueue = [];

document.getElementById('submitButton').addEventListener('click', () => {
    var currentdate = new Date();
    let when = currentdate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    messagesQueue.push({
        text: textInput.value,
        when: when
    });

    textInput.value = "";
});

function sendMessageToHub(message) {
    // SignalR üzerinden hub'a mesaj gönderme işlemi burada gerçekleştirilecek
    // Bu kısmın doğru bir şekilde uygulanması için projenizdeki SignalR konfigürasyonunu kontrol edin.
    // Örneğin: connection.invoke("SendMessageToHub", message);
}

function sendMessage() {
    let queuedMessage = messagesQueue.shift();

    if (!queuedMessage || !queuedMessage.text.trim()) {
        return; // Boş mesaj gönderilmemeli
    }

    let message = new Message(username, queuedMessage.text, queuedMessage.when);
    sendMessageToHub(message);
}

function addMessageToChat(message) {
    let isCurrentUserMessage = message.userName === username;

    let container = document.createElement('div');
    container.className = isCurrentUserMessage ? "container darker" : "container";

    let sender = document.createElement('p');
    sender.className = "sender";
    sender.innerHTML = message.userName;

    let text = document.createElement('p');
    text.innerHTML = message.text;

    let when = document.createElement('span');
    when.className = isCurrentUserMessage ? "time-left" : "time-right";
    when.innerHTML = message.when;

    container.appendChild(sender);
    container.appendChild(text);
    container.appendChild(when);
    chat.appendChild(container);
}
