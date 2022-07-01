import express from "express";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
import userRoutes from "./routes/routesUser";
import roomRoutes from './routes/routesRoom';
import bookingRoutes from './routes/routesBooking';


const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use('/booking', bookingRoutes);


app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);


connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(3000, () => {
    console.log ('Server started on port 3000');
});