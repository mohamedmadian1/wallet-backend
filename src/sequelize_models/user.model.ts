import {Table,Column,HasMany,AutoIncrement,PrimaryKey,AllowNull,NotEmpty,DataType, Model, ForeignKey} from "sequelize-typescript";
import { Role } from "./role.model";

// export interface IUser {
//     id?:number|null
//     name: string;
//     mobile: Number;
//     password: string;
//     balance: Number;
// }
@Table({
    tableName:"user",
    timestamps:true
})
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    mobile!: Number;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    balance!: Number;
    
   
    @HasMany(() => Role)
    roles!: Role[];

    

}
