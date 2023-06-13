const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Génère des données aléatoires pour le graphique
function generateRandomData() {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
}

app.use(express.static('./public'));


// Route pour la page Graphe
app.get('/Data', (req, res) => {
  res.sendFile(__dirname + '/indexGraphe.html');
});

// Gestion de la connexion du client via Socket.IO
io.on('connection', (socket) => {
  console.log('Un client est connecté');

  // Envoie des données aléatoires au client toutes les secondes
  const interval = setInterval(() => {
    const data = generateRandomData();
    socket.emit('data', data);
  }, 1000);

  // Gestion de la déconnexion du client
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
    clearInterval(interval);
  });
});

// Démarrage du serveur
const port = 3000;
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});