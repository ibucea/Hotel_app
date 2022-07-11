import express from "express";
import http from 'http';
import bodyParser from 'body-parser';
import connection from "./db/config";
import config  from './server/config'
import { json, urlencoded } from "body-parser";
import userRoutes from "./routes/routesUser";
import roomRoutes from './routes/routesRoom';
import bookingRoutes from './routes/routesBooking';


const app = express();

app.use(json());

// app.use(urlencoded({ extended: true }));

/** Log the request */
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

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


/** Routes go here */
app.use("/", userRoutes);
app.use("/", roomRoutes);
app.use('/', bookingRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
    console.log (`Server started on port ${config.server.port}`);
});
