const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// MongoDB Verbindung
mongoose.connect('mongodb://localhost/echtzeit-chat-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB-Verbindungsfehler:', err));

io.on('connection', (socket) => {
  console.log('Ein Benutzer verbunden:', socket.id);
  socket.on('disconnect', () => {
    console.log('Benutzer getrennt:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Echtzeit Chat App Backend läuft!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});