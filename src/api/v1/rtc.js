import router from './index.js';
import { roomList } from '@/socket/roomStore';

router.get('/room-list', (ctx) => {
  const data = roomList.map((item) => {
    let status = 1;
    if (item.nums >= 2) status = 3;
    else if (item.password) status = 2;
    return { name: item.name, nums: item.nums, id: item.id, status };
  });
  ctx.success({
    data,
  });
});

export default router;
