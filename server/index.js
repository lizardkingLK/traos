const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require('config');
const mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  const server = require('http').createServer(app);
  const io = require('./io').initialize(server);

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // parser
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // routes
  const orders = require('./routes/api/orders');
  const stations = require('./routes/api/stations');
  const histories = require('./routes/api/histories');

  // mongodb connect
  const uri = config.get('mongoURI');
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
    console.log('traosdb online...');
  });

  // Answer API requests.
  app.use('/api/orders', orders);
  app.use('/api/stations', stations);
  app.use('/api/histories', histories);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  server.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
  });

  io.on('connection', socket => {
    console.log('connected...');
  })

}
