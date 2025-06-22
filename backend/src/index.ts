import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()
  const hashedpassword = await bcrypt.hash(body.password, 100)
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedpassword
      }
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email },
      token
    }, 201)

  } catch (error) {
    return c.json({ error: 'Email already exists' }, 400)
  }
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (!existingUser) {
    return c.json({ error: 'Email does not exists' }, 403)
  }

  const validateUser = await bcrypt.compare(existingUser.password, body.password);

  if(!validateUser){
    return c.json({ error: 'invalid credentials'},404)
  }

  const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET)
  return c.json({ token })

})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

  return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('signin route')
})

app.get('/api/v1/blog/bulk', (c) => {

})

export default app;
