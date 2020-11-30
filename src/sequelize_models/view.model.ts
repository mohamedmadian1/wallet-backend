import {Table,Column,HasMany,AutoIncrement,PrimaryKey,AllowNull,NotEmpty,DataType, Model, ForeignKey, BelongsTo, BelongsToMany} from "sequelize-typescript";
import { ViewRole } from './viewrole.model';
import { Role } from "./role.model";
import { User } from "./user.model";

export interface ViewI {
    id?:number|null
    name: string;
}
@Table({
    tableName:"view",
    timestamps:true
})
export class View extends Model<View> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    // @BelongsTo(()=>User)
    // user!:User
    @BelongsToMany(()=>Role, ()=>ViewRole)
    roles!:Role[];
    
   
}
