require("module-alias/register");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const InitManager = require("@core/init");

const app = new Koa();
const http = require("http").createServer(app.callback());
const io = require("socket.io")(http);

// const roomInfo = {};
// io.on("connection", (socket) => {
//   socket.on("join", (data) => {
//     console.log("data", data);
//     const roomID = data.roomID;
//     const user = data.user;
//     user.socketID = socket.id;
//     socket.join(roomID);
//     if (!roomInfo[roomID]) {
//       roomInfo[roomID] = [];
//     }
//     const inFlag = roomInfo[roomID].find((item) => {
//       return item.uuid === user.uuid;
//     });
//     if (inFlag) return;
//     roomInfo[roomID].push(user);
//     console.log("roomInfo[roomID]", roomInfo[roomID]);
//     io.in(roomID).emit("joined", roomInfo[roomID].length);

//     socket.on("disconnect", () => {
//       console.log("roomInfo[roomID]", roomInfo[roomID]);
//       console.log("socket.id", socket.id);
//       roomInfo[roomID] = roomInfo[roomID].filter((item) => {
//         return item.socketID !== socket.id;
//       });
//       io.in(roomID).emit("leaved", roomInfo[roomID]);
//     });

//     socket.on('client message',data=>{
//       const val = roomInfo[roomID].find((item) => {
//         return item.socketID === socket.id;
//       });
//       let msgObj = {
//         name: val.name,
//         me: false,
//         content: data.msg
//       }
//       socket.to(roomID).emit('server message',msgObj)
//     })
//   });
// });

io.on("connection", (socket) => {
  let roomID;
  socket.on("join", (data) => {
    roomID = data.roomID;
    let myRoom = io.sockets.adapter.rooms.get(roomID)
    let userNum=0
    if(myRoom){
      userNum = +myRoom.size
    }
    if(userNum>=2){
      socket.emit("fulled");
    }else{
      socket.join(roomID);
      io.in(roomID).emit("joined", userNum+1);
    }
  });
  
  socket.on("disconnect", () => {
    const myRoom = io.sockets.adapter.rooms.get(roomID)
    if(myRoom){
      if(+myRoom.size>=2) return
      socket.to(roomID).emit("joined", myRoom.size);
    }
  });

  socket.on('client message',data=>{
    let msgObj = {
      name: data.name,
      me: false,
      content: data.msg
    }
    socket.to(roomID).emit('server message',msgObj)
  })
});

app.use(bodyParser());
InitManager.InitCore(app);

http.listen(3000, () => {});
