import { Sequelize } from "sequelize-typescript";
import { Bookings } from "../models/bookings";
import { Rooms } from "../models/rooms";
import { Users } from "../models/users";

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "Miss&U&Forever91",
    database: "hotelBD",
    logging: false,
    models: [Users, Rooms, Bookings]
  });
  
  export default connection;