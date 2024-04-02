// Importar la librería de Google Generative AI
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

// Configurar la clave de API y el nombre del modelo
const MODEL_NAME = 'tunedModels/alm-vz3ipgz49f1z';
const API_KEY = 'AIzaSyA8QtDid4MvetubxoCGkIJwCFk9On42In4';

// Elementos del DOM
const chatArea = document.querySelector('.chat-area');
const inputField = document.querySelector('input[type="text"]');
const brandLogo = document.querySelector('.brand-logo');

// Instancia de GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Función para enviar el mensaje a la API y mostrar la respuesta
async function sendMessage(message) {
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 8192,
  };

  const safetySettings = [];

  const parts = [
    { text: 'input: ' + message },
    { text: 'output: ' },
  ];

  const result = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response.text();
  displayMessage('ALM: ' + response);
}

// Función para mostrar los mensajes en el área de chat
function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatArea.appendChild(messageElement);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Manejar el evento de envío de mensaje
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const message = inputField.value.trim();
    if (message) {
      displayMessage('You: ' + message);
      sendMessage(message);
      inputField.value = '';
    }
  }
});

// Manejar el clic en el logotipo de la marca
brandLogo.addEventListener('click', () => {
  const donationWindow = window.open('', '_blank');
  donationWindow.document.write(`
    <html>
      <head>
        <title>Donate</title>
      </head>
      <body>
        <h1>Support BUEORM</h1>
        <p>Do you want to donate to support BUEORM?</p>
        <button onclick="window.open('https://www.patreon.com/', '_blank')">Donate on Patreon</button>
        <button onclick="window.close()">Cancel</button>
      </body>
    </html>
  `);
});