import Koa from "koa"
import body from 'koa-body'

import products from './routes/products.js'

const app = new Koa()

app.use(body())
app.use(products.routes())

app.use(async (ctx, next) => {
  console.log('1')
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('2')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('2 e')
});
app.use(async (ctx) => ctx.body = 'Hello World')

const server = app.listen(3000, () => console.log('listening on http://localhost:3000'))

server.on('error', err => console.log(err))
