const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  let socketData = {
    ihaleRefNo : req.body.ihaleRefNo,
    teklifTutari : req.body.teklifTutari
  }
  io.emit('socketTeklif', socketData);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('socketTeklif', (msg) => {
    io.emit('socketTeklif', msg);
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});