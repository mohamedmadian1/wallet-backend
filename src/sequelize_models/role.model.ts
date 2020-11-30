import {Table,Column,HasMany,AutoIncrement,PrimaryKey,AllowNull,NotEmpty,DataType, Model, ForeignKey, BelongsTo, BelongsToMany} from "sequelize-typescript";
import { User } from "./user.model";
import { UserRole } from "./userrole.model";
import { View } from "./view.model";
import { ViewRole } from "./viewrole.model";

export interface RoleI {
    id?:number|null
    name: string;
}
@Table({
    tableName:"role",
    timestamps:true
})
export class Role extends Model<Role> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    @BelongsToMany(()=>User,()=>UserRole)
    user!:User

    @ForeignKey(()=>User)
    userId!:number

    @BelongsToMany(()=>View,()=>ViewRole)
    views!:View[];

}
