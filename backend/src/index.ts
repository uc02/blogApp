import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogrouter } from "./routes/blog";


 const app = new  Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
 }>()

 app.route('/api/v1/user', userRouter)
 app.route('/api/v1/blog', blogrouter)


export default app;
