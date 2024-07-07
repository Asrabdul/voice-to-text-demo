// client.js

// Get references to the HTML elements
const noteTextArea = document.getElementById('noteTextArea');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const linkButton = document.getElementById('linkButton');
const logoutButton = document.getElementById('logoutButton');
const downloadButton = document.getElementById('downloadButton');

// Set up the speech recognition
let recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.maxResults = 10;

// Set up the event listeners
startButton.addEventListener('click', startSpeechRecognition);
stopButton.addEventListener('click', stopSpeechRecognition);
linkButton.addEventListener('click', addLink);
logoutButton.addEventListener('click', logout);
downloadButton.addEventListener('click', downloadNotes);

// Function to start speech recognition
function startSpeechRecognition() {
  recognition.start();
  console.log('Speech recognition started...');
}

// Function to stop speech recognition
function stopSpeechRecognition() {
  recognition.stop();
  console.log('Speech recognition stopped...');
}

// Function to add a link to the notes
function addLink() {
  const link = prompt('Enter the link:');
  if (link) {
    const linkText = `<a href="${link}" target="_blank" class="note-link">${link}</a>`;
    noteTextArea.value += `\n\n${linkText}\n`;
  }
}

// Function to logout
function logout() {
  noteTextArea.value = '';
  downloadButton.disabled = true;
}

// Function to download the notes
function downloadNotes() {
  const notes = noteTextArea.value;
  const blob = new Blob([notes], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.txt';
  a.click();
}

// Set up the speech recognition event listeners
recognition.onresult = event => {
  const transcript = event.results[0][0].transcript;
  noteTextArea.value += transcript + '\n';
};

recognition.onerror = event => {
  console.error('Speech recognition error:', event);
};

let timer = setTimeout(() => {
    recognition.stop();
  }, 3600000); // 1 hour in milliseconds
  
  recognition.onspeechend = () => {
    clearTimeout(timer);
  };

  // Set the language(s) to recognize
recognition.lang = 'en-US,fr-FR,es-ES,hi-IN,ur-PK'; // multiple languages