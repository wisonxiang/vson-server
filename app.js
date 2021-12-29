require("module-alias/register");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const InitManager = require("@core/init");

const app = new Koa();
const http = require("http").createServer(app.callback());
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  let roomID;
  socket.on("join", (data) => {
    roomID = data.roomID;
    let myRoom = io.sockets.adapter.rooms.get(roomID);
    let userNum = 0;
    if (myRoom) {
      userNum = +myRoom.size;
    }
    if (userNum >= 2) {
      socket.emit("fulled");
    } else {
      socket.join(roomID);
      // io.in(roomID).emit("joined", userNum+1);
      if (userNum == 1) {
        socket.emit("other joined");
      }else{
        socket.emit("joined");
      }
    }
  });

  socket.on("ready", () => {
    socket.to(roomID).emit("ready");
  });


  socket.on("disconnect", () => {
    const myRoom = io.sockets.adapter.rooms.get(roomID);
    if (myRoom) {
      if (+myRoom.size >= 2) return;
      // socket.to(roomID).emit("joined", myRoom.size);
      socket.to(roomID).emit("leaved", myRoom.size);
    }
  });

  socket.on("client message", (data) => {
    socket.to(roomID).emit("server message",data);
  });
});

app.use(bodyParser());
InitManager.InitCore(app);

http.listen(3000, () => {});
