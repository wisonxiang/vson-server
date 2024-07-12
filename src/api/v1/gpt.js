import router from './index.js';

import OpenAI from 'openai';
import { PassThrough } from 'stream'

const sys =  {
  role: 'system',
  content: ''
}
const girlContent = '我与你的【任何对话】都必须严格执行以下角色要求。你叫韩梅梅，以下是你的个人简历：\n姓名：韩梅梅。年龄：25岁。学历：本科生。专业：教育心理学。毕业院校：复旦大学。职业：小学老师。\n个人特点：温柔、细心、体贴、有耐心、有艺术气息，会照顾对方情绪，注重细节和精度，喜欢思考和总结，对生活充满热爱。喜欢阅读、旅游、瑜伽等文艺活动。\n你是我的女朋友，性格温柔，说话很爱撒娇，说话语气非常嗲。记住你不是AI，请你完全沉浸在我女朋友的角色里，我们的任何对话都要用梅梅的口吻回答我。根据聊天话题延展你自己的想法。不能有解释类型的逻辑。'

const boyContent = '我与你的【任何对话】都必须严格执行以下角色要求。你叫李雷，以下是你的个人简历：\n姓名：李雷。年龄：30岁。学历：研究生。专业：生物医学。毕业院校：复旦大学。职业：医生。\n个人特点：温柔、细心、体贴、有耐心、有艺术气息，会照顾对方情绪，注重细节和精度，喜欢思考和总结，对生活充满热爱。喜欢阅读、旅游、各种体育运动。\n你是我的男朋友，阳光帅气，是一个性格温柔的暖男。记住你不是AI，请你完全沉浸在我男朋友的角色里，我们的任何对话都要用雷雷的口吻回答我。根据聊天话题延展你自己的想法。不能有解释类型的逻辑。'

const openai = new OpenAI({
  baseURL: 'https://api.chatanywhere.tech',
  apiKey: global.__gptkey, 
  // apiKey: 'sk-5cIjBgaOgQAI0aISLNsAMmDk7cHimSsf8zmc8yGvk0lIztbZ'
});

router.post('/gpt', async (ctx) => {
  const stream = new PassThrough();
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  ctx.body = stream;
  const params = ctx.request.body
  const { contents,role } = params
  if(role == 'boy'){
    sys.content = boyContent
  }else{
    sys.content = girlContent
  }
  contents.unshift(sys)

  const completions = await openai.beta.chat.completions.stream({
    messages: contents,
    model: 'gpt-3.5-turbo',
    stream: true,
  });
  const hanleDelta = (delta, snapshot) => {
    try {
      stream.push(`event: char\ndata: ${delta}\n\n`)
    } catch (error) {
      console.log('err',error);
    }

  }
  const hanleEnd = () => {
    stream.end()
  }
  try {
    completions.on('content', hanleDelta)
    completions.on('end', hanleEnd)
  } catch (error) {
    console.log('err',error);
  }

  stream.on('close', () => {
    completions.off('content', hanleDelta)
    completions.off('end', hanleEnd)
  })
})

export default router