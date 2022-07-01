import { Table, Model, Column, DataType } from "sequelize-typescript";
import { DateDataType, DecimalDataType, IntegerDataType } from "sequelize/types";

@Table({
  timestamps: false,
  tableName: "Bookings",
})
export class Bookings extends Model {
  @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    bookingId!: IntegerDataType;

  @Column({
        type: DataType.INTEGER,
        references: {
            model: 'Rooms',
            key: 'roomId'
        }
    })
    roomId!: IntegerDataType;

  @Column({
        type: DataType.INTEGER,
        references: {
            model: 'Users',
            key: 'userId'
        }
    })
    userId!: IntegerDataType;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price!: DecimalDataType;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateArrived!: DateDataType;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateDepart!: DateDataType;
}
