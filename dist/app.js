"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./db/config"));
const config_2 = __importDefault(require("./server/config"));
const body_parser_2 = require("body-parser");
const routesUser_1 = __importDefault(require("./routes/routesUser"));
const routesRoom_1 = __importDefault(require("./routes/routesRoom"));
const routesBooking_1 = __importDefault(require("./routes/routesBooking"));
const app = (0, express_1.default)();
app.use((0, body_parser_2.json)());
// app.use(urlencoded({ extended: true }));
/** Log the request */
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
/** Parse the body of the request */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
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
app.use("/user", routesUser_1.default);
app.use("/room", routesRoom_1.default);
app.use('/booking', routesBooking_1.default);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
config_1.default
    .sync()
    .then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
    console.log("Error", err);
});
app.listen(config_2.default.server.port, () => {
    console.log(`Server started on port ${config_2.default.server.port}`);
});
