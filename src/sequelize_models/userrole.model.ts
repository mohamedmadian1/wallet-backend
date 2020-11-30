import {Column, ForeignKey, Model, Table, } from 'sequelize-typescript';
import {Role} from './role.model';
import {User} from './user.model'

@Table({
    tableName:'userRole',
    timestamps:true
})
export class UserRole extends Model<UserRole> {
    @ForeignKey(() => User)
    @Column
    userId!:number;

    @ForeignKey(()=>Role)
    @Column
    roleId!:number;
}