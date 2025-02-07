const chatbotContainer = document.getElementById('chatbot-container');
const chatOutput = document.getElementById('chat-output');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');

const responses = {
  hello: "Good day my Dear Crafty Customer, Yarnie is here to help ease with your inquiries.〵(^ o ^)〴",
  hi: "Hello my dear crafty customer, I'm Yarnie your trustworthy Bot friend here to help. 〵(^ o ^)〴",
  help: "Sure! What do you need help with?",
  default: "I'm not sure how to respond to that. Can you rephrase?",
  welcome: "Welcome! How can I assist you today? 😊",  // New response
};

let hasWelcomeMessage = false;  // Flag to track if welcome message has been sent

// Function to toggle chatbot visibility
function toggleChatbot() {
  chatbotContainer.classList.toggle('collapsed');
  
  // Automatically send a welcome message when the chatbot opens, but only once
  if (!chatbotContainer.classList.contains('collapsed') && !hasWelcomeMessage) {
    setTimeout(() => {
      appendMessage(responses.welcome, 'bot-message');
      hasWelcomeMessage = true;  // Set flag to true after sending the welcome message
    }, 500);
  }
}

function appendMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.className = `message ${className}`;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

sendButton.addEventListener('click', () => {
  const userInput = chatInput.value.trim().toLowerCase();
  if (!userInput) return;

  appendMessage(userInput, 'user-message');
  chatInput.value = '';

  const botResponse = getBotResponse(userInput);
  setTimeout(() => appendMessage(botResponse, 'bot-message'), 500);
});

chatInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

// Improved response matching function
function getBotResponse(userInput) {
  if (userInput.includes("help")) {
    return responses.help;
  }
  if (userInput.includes("hello")) {
    return responses.hello;
  }
  if (userInput.includes("hi")) {
    return responses.hi;
  }
  return responses.default;
}
