import { Server } from 'socket.io';
import { createServer } from 'http';
import { createRoom, joinRoom, leaveRoom } from './roomStore.js';
import { nanoid } from 'nanoid';

// function createSocket(app){
//   const httpServer = createServer(app.callback());
//   const socketServer = new Server(httpServer,{
//     path:'/socket',
//     cors: {
//       origin: '*',
//     },
//   })

//   const gSocket = socketServer.of('/vson')
//   gSocket.on('connection',(socket)=>{
//     let user,room;
//     socket.on('join',(obj,callback)=>{
//       user = obj
//       room = gSocket.adapter.rooms.get(user.roomId)
//       const roomSize = room?.size ?? 0
//       if(roomSize>=10) return callback(roomSize)
//       socket.join(user.roomId)
//       addSocketUser(user,socket.id)
//       socket.to(user.roomId).emit('roomSize',roomSize+1)
//     })
//     socket.on('leave',(obj,callback)=>{
//       if(user?.roomId){
//         socket.leave(user.roomId);
//         delSocketUser(user,socket.id)
//         room = gSocket.adapter.rooms.get(user.roomId)
//         const roomSize = room?.size || 0
//         socket.to(userInfo.roomId).emit('roomSize',roomSize)
//         callback(roomSize)
//       }
//     })
//     socket.on('sendMsg',(msg,callback)=>{
//       const time = +new Date()+ ''
//       const msgObj = {name:user.name,msg,time}
//       socket.to(user.roomId).emit('send-msg',msgObj)
//       callback(msgObj)
//     })
//     socket.on('disconnect',()=>{
//       if(user?.roomId){
//         console.log('~~~~~~~~',room);
//         socket.to(user.roomId).emit('roomSize', room?.size);
//         delSocketUser(user);
//       }
//     })
//   })
//   return httpServer
// }

function createSocket(app) {
  const httpServer = createServer(app.callback());
  const socketServer = new Server(httpServer, {
    path: '/socket',
    cors: {
      origin: '*',
    },
  });

  const gSocket = socketServer.of('/vson');
  gSocket.on('connection', (socket) => {
    gSocket.emit('online-nums', gSocket.sockets.size);

    socket.on('create-room', (obj, callback) => {
      const id = nanoid();
      socket.join(id);
      createRoom({ ...obj, id, nums: 1 });
      callback(id);
      gSocket.emit('update-rooms');
    });
    socket.on('join-room', (obj, callback) => {
      const room = joinRoom(obj);
      if (room) {
        socket.join(room.id);
        gSocket.emit('update-rooms');
      } else {
        callback(false);
      }
    });
    socket.on('leave-room', (obj) => {
      leaveRoom(obj.id);
      socket.leave(obj.id);
      gSocket.emit('update-rooms');
    });

    socket.on('msg', (obj) => {
      socket.to(obj.id).emit('msg', obj.msg);
    });
    socket.on('disconnect', () => {
      leaveRoom(socket.conn.id);
      gSocket.emit('online-nums', gSocket.sockets.size);
      gSocket.emit('update-rooms');
    });
  });
  return httpServer;
}

export default createSocket;
