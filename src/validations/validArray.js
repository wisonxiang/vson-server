import { responseError } from '@/utils/exception.js';

export default function validArray(name, val) {
  try {
    const arr = JSON.parse(val);
    console.log('arr', arr);
    if (Array.isArray(arr)) return true;
    throw new Error();
  } catch (error) {
    responseError({ msg: `参数错误,${name}字段需参数组`, code: 400 });
  }
}
