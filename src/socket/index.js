import { Server } from 'socket.io';
import { createServer } from 'http';
import { addSocketUser, delSocketUser } from './socketStore.js';

function createSocket(app){
  const httpServer = createServer(app.callback());
  const socketServer = new Server(httpServer,{
    path:'/socket',
    cors: {
      origin: '*',
    },
  })

  const gSocket = socketServer.of('/vson')
  gSocket.on('connection',(socket)=>{
    let user,room;
    socket.on('join',(obj,callback)=>{
      user = obj
      room = gSocket.adapter.rooms.get(user.roomId)
      const roomSize = room?.size ?? 0
      if(roomSize>=10) return callback(roomSize)
      socket.join(user.roomId)
      addSocketUser(user,socket.id)
      socket.to(user.roomId).emit('roomSize',roomSize+1)
    })
    socket.on('leave',(obj,callback)=>{
      if(user?.roomId){
        socket.leave(user.roomId);
        delSocketUser(user,socket.id)
        room = gSocket.adapter.rooms.get(user.roomId)
        const roomSize = room?.size || 0
        socket.to(userInfo.roomId).emit('roomSize',roomSize)
        callback(roomSize)
      }
    })
    socket.on('sendMsg',(msg,callback)=>{
      const time = +new Date()+ ''
      const msgObj = {name:user.name,msg,time}
      socket.to(user.roomId).emit('send-msg',msgObj)
      callback(msgObj)
    })
    socket.on('disconnect',()=>{
      if(user?.roomId){
        console.log('~~~~~~~~',room);
        socket.to(user.roomId).emit('roomSize', room?.size);
        delSocketUser(user);
      }
    })
  })
  return httpServer
}

export default createSocket