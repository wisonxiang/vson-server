import router from './index.js';

import OpenAI from 'openai';
import { PassThrough } from 'stream'

const openai = new OpenAI({
  baseURL: 'https://api.chatanywhere.com.cn',
  apiKey: global.__gptkey, // This is the default and can be omitted
});

router.post('/gpt', async (ctx) => {
  const pt = new PassThrough();
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  ctx.body = pt;
  const params = ctx.request.body
  const { contents } = params

  const stream = await openai.beta.chat.completions.stream({
    messages: contents,
    model: 'gpt-3.5-turbo',
    stream: true,
  });
  const hanleDelta = (delta, snapshot) => {
    pt.push(`event: char\ndata: ${delta}\n\n`)
  }
  const hanleEnd = () => {
    pt.end()
  }
  stream.on('content', hanleDelta)
  stream.on('end', hanleEnd)

  pt.on('close', () => {
    stream.off('content', hanleDelta)
    stream.off('end', hanleEnd)
  })
})

export default router