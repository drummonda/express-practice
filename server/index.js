const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const db = require('./models');

const PORT = 3000;
server.listen(PORT, () => {
  db.sync({ alter: true });
  console.log('listening on port', PORT);
});
