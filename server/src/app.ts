import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from 'morgan'
import createHttpError,{isHttpError} from "http-errors";
// Routes
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import cookieParser from 'cookie-parser'
import passport from 'passport';
import authPassport from './middleware/passport'
const app = express();

// middleware
app.use(morgan("dev"));
// it tell express to accept json as body(it converts req.body into json)
app.use(express.json());
app.use(cookieParser())
app.use(passport.initialize());
authPassport(passport);
/* this is middleware that catches that get which then check the noteRoutes
and look which one is there */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api", userRoutes)
app.use('/api', productRoutes)
// to handle if Endpoint  does not exist
app.use((req,res,next) => {
    next(createHttpError(404,"Endpoint not Found"))
})
// this catches error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if(isHttpError(error))  {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});
export default app;
