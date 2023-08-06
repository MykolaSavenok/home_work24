const connectedToChat = document.querySelector('.btn');
const messageInput = document.querySelector('.message');
const messagesContainer = document.querySelector('.messages');
const connectionStatus = document.querySelector('.info-status');
const userName = document.querySelector('.username');
const userActive = document.querySelector('.user-active');
const labelName = document.querySelector('.label-name');

connectionStatus.textContent = 'Not connected';
connectionStatus.style.color = 'red';
messageInput.style.display = 'none';

function getCurrentTime() {
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
   return `${hours}:${minutes}:${seconds}`;
}

let ws;

connectedToChat.addEventListener('click', (e) => {
   e.preventDefault();

   if (userName.value.trim()) {
      connectionStatus.textContent = 'Connected';
      connectionStatus.style.color = 'green';
      userActive.textContent = `Повідомлення від ${userName.value.trim()}:`;
      messageInput.style.display = 'inline-block';
      labelName.textContent = '';
      userName.style.display = 'none';
      connectedToChat.textContent = 'Відправити';

      localStorage.setItem('username', userName.value.trim());

      if (!ws) {
         ws = new WebSocket('ws://localhost:5557');

         ws.addEventListener('open', () => {
            console.log('Connected to server');
         });

         ws.addEventListener('message', (event) => {
            const receivedMessage = event.data;
            displayMessage(receivedMessage);
         });
      }
   }

   if (messageInput.value.trim()) {
      sendMessageToServer(messageInput.value);
      messageInput.value = '';
   } else if (!userName.value.trim()) {
      alert('Invalid name, please enter your name');
   }
});

function sendMessageToServer(message) {
   ws.send(message);
   console.log('Sent message to server:', message);
}

function displayMessage(message) {
   const messageElement = document.createElement('div');
   const username = localStorage.getItem('username');
   messageElement.textContent = `[${getCurrentTime()}] ${username}: ${message}`;
   messagesContainer.appendChild(messageElement);
}
