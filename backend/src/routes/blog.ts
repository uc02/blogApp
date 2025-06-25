import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema, updateBlogSchema } from "@uc02/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  };
  Variables: {
    userId: string;
  }
}>()

//middleware for authentication
blogrouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('authorization') || ''
  const token = authHeader.split(' ')[1]
  try {
    const user = await verify(token, c.env.JWT_SECRET)
  if (user) {
    const userId = typeof user.id === "string" ? user.id : String(user.id);
    c.set("userId", userId);
    await next()
  } else {
    return c.json({ message: "you are not logged in" }, 403)
  }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Unknown error';

      return c.json({ message })
  }
});

blogrouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get('userId')
  try {
    const blog = await prisma.post.findMany({
      where: {
        authorId: authorId
      },
    });
    return c.json({ blog }, 202)
  } catch (error) {
   const message = error instanceof Error 
     ? error.message
     : 'Unknown error'

     return c.json({message}, 400)
  }
})

blogrouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const authorId = c.get("userId")

  const { success } = createBlogSchema.safeParse(body)

  if(!success){
    return c.json({ message: 'invalid inputs'},411)
  }

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId
      }
    })
    return c.json({
      id: blog.id
    })
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Unknown error'

    return c.json({ message }, 500)
  }
})

blogrouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const { success } = updateBlogSchema.safeParse(body)

  if(!success){
    return c.json({message: 'invalid inputs'},411)
  }

  try {
    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      }
    })

    return c.json({
      id: blog.id
    }, 200)
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Unknown error'

    return c.json({ message }, 500)
  }
})

blogrouter.get('/:id', async(c) => {
  const id = c.req.param('id');
 const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      }
    })
    return c.json({ blog }, 200)
  } catch (error) {
    return c.json({ message: 'may be wrong id'}, 405)
  }
  
})

//pagination
blogrouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
    select: { title: true, content: true,id: true }
  })
  return c.json({ blogs }, 200)
  } catch (error) {
    const message = error instanceof  Error 
      ? error.message
      : 'Unknown error'

      return c.json({ message }, 500)
  }
})

