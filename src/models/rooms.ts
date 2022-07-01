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
  roomType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;
}
