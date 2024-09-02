export const roomList = [];

export function createRoom(obj) {
  roomList.push(obj);
}

export function joinRoom(obj) {
  const room = roomList.find((item) => item.id === obj.id);
  if (!room) return false;
  if (!!room.password && room.password !== obj.password) return false;
  room.nums = room.nums + 1;
  return room;
}

export function leaveRoom(id) {
  const index = roomList.findIndex((item) => item.id === id);
  if (index > -1) {
    roomList[index].nums--;
    if (roomList[index].nums <= 0) roomList.splice(index, 1);
  }
  return !!roomList.find((item) => item.id === id);
}
