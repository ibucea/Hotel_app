import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IntegerDataType } from "sequelize/types";

@Table({
  timestamps: false,
  tableName: "Users",
})
export class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userId!: IntegerDataType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    
  })
  username!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  session!: string;
}
