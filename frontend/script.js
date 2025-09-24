document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const toggleModeBtn = document.getElementById("toggleMode");
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");

  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    userInput.value = '';

    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          addMessage('bot', data.response);
        } else if (data.error) {
          addMessage('bot', 'Error: ' + data.error);
        }
      })
      .catch(error => {
        addMessage('bot', 'Error: ' + error.message);
      });
  }

  function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    popup.style.display = "block";
    popupText.textContent = document.body.classList.contains("dark-mode")
      ? "Dark mode ON 🌙"
      : "Light mode ON ☀️";

    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  });
});