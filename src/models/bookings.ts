import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IntegerDataType } from "sequelize/types";
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
    type: DataType.DATE,
    allowNull: false,
  })
  checkInDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  checkOutDate!: Date;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  daysOfStay!: Number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;
}
