import {Column, ForeignKey, Model, Table, } from 'sequelize-typescript';
import {Role} from './role.model';
import { View } from './view.model';

@Table({
    tableName:'viewRole',
    timestamps:true

})
export class ViewRole extends Model<ViewRole> {
    @ForeignKey(() => View)
    @Column
    viewId!:number;

    @ForeignKey(()=>Role)
    @Column
    roleId!:number;
}