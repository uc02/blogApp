import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signinSchema, signupSchema } from '@uc02/medium-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const { success } = signupSchema.safeParse(body)

  if (!success) {
    return c.json({ message: "Inputs are incorrect" }, 411)
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
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

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const { success } = signinSchema.safeParse(body)
  if (!success) {
     return c.json({ message: "Inputs are incorrect" }, 406)
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (!existingUser) {
      return c.json({ error: 'Email does not exists' }, 403)
    }

    const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET)
    return c.json({ token })

  } catch (error) {
    return c.json({ message: 'error', error })
  }

})