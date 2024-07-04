export const socketMap = new Map();

export function addSocketUser(user, socketid) {
  const room = socketMap.get(user.roomId);
  if (!room) {
    socketMap.set(user.roomId, new Map([[user.userId, socketid]]));
  } else {
    room.set(user.userId, socketid);
  }
}

export function findSocketId(roomId, userId) {
  const room = socketMap.get(roomId);
  if (!room) return false;
  const user = room.get(userId);
  if (!user) return false;
  return user;
}

export function delSocketUser(user) {
  const room = socketMap.get(user.roomId);
  if (!room) return false;
  room.delete(user.userId);
  if(!room.size){
    socketMap.delete(room)
  }
}
