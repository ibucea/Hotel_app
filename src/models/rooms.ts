import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IntegerDataType } from "sequelize/types";

@Table({
  timestamps: false,
  tableName: "Rooms",
})
export class Rooms extends Model {
  @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    roomId!: IntegerDataType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,

  })
  pricePerNight!: IntegerDataType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,

  })
  guestCapacity!: IntegerDataType;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,

  })
  numOfBeds!: IntegerDataType;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,

  })
  breakfast!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,

  })
  internet!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,

  })
  airConditioned!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,

  })
  petsAllowed!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,

  })
  roomCleaning!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

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
