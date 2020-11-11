import {
    Document,
    Schema,
    Model,
    model,
  } from "mongoose";

  export interface IRole extends Document {
      role:string
  }
  export const roleSchema:Schema = new Schema({
      role:{
          type:String,
          enum: ["client","admin"],
          default:"client"
      }
  }) 

  export const role:Model<IRole> = model<IRole>("Role",roleSchema) 