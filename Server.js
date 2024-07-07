// server.js

import express, { json } from 'express';
const app = express();

app.use(json());

app.post('/transcript', (req, res) => {
  const transcript = req.body.transcript;
  console.log(`Received transcript: ${transcript}`);
  res.json({ message: 'Transcript received successfully' });
}); // added closing parenthesis

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});