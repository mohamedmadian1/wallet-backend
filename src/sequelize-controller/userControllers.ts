import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import { IUser, User } from "../models/user";
import {  User } from "../sequelize_models/user.model";
import { validationResult } from "express-validator";

export class UserController {
  constructor() {}
  //register user
  public registerUser = (req: any, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const password = req.body.password;
    const mobile = req.body.mobile;
    //validate input
    this.validateInput(req);

    bcrypt.hash(password, 10).then((hashedPass) => {
      console.log("role", req.body.role)
      const newUser = User.create({
        name: name,
        mobile: mobile,
        password: hashedPass,
        balance: 1000,
        // role: req.body.role ||"client",
        roles: "client",
      });
      newUser
        .then((result) => {
          console.log("new user" , result)
          res.status(201).json({
            message: "user created!!",
            result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    });
  };

  //login user
  public authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.validateInput(req);

    let currentUser: User;
    User.findOne({where:{mobile:req.body.mobile} })
      .then((user): any => {
        if (!user) {
          return res.status(401).json({
            message: " Auth failed",
          });
        }
        currentUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: " Auth failed",
          });
        }
        const token = jwt.sign(
          { mobile: currentUser.mobile, userId: currentUser.id },
          "secret_This_should_be_longer",
          { expiresIn: "1h" }
          // {role:currentUser.role}
        );
        res.status(200).json({
          token: token,
          _id: currentUser.id,
          expiresIn: 3600,
          roles: currentUser.roles,
        });
        return;
      })
      .catch((err) => {
        res.status(401).json({
          message: " Auth failed",
          err,
        });
        return err;
      });
  };

  //get All users
  public getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.findAll()
    .then(users=>{
      res.status(200).json({message:"users fetched successfully!", users:users})
    }).catch(err=>{
      console.log(err)
    })
  };

  //get single user
  public getUser = (req: Request, res: Response, next: NextFunction)=>{
    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user=>{
      res.status(200).json({message:"user fetched successfully!", user:user})
    }).catch(err=>{
      console.log(err)
      // res.status(500)
    })
  }

  //update user
  public updateUser = (req: Request, res: Response, next: NextFunction)=>{
    const updatedUser = {
      id:req.params.id,
      name:req.body.name,
      mobile:req.body.mobile,
      role:req.body.role
    }
    User.update(updatedUser,{where:{ id:req.params.userId}})
    .then(updateduser=>{
      console.log(updatedUser);
      res.status(201).json({message:'user updated successfully!'})
    }).catch(err=>{
      console.log(err)
    })
  }

  //Delete user
  
public deleteUser = (req: Request, res: Response, next: NextFunction)=>{
  const userId = req.params.userId;
  User.destroy({where:{ id:userId}}).then(result=>{
    console.log(result)
    res.status(200).json({message:'user deleted!!'})
  })
}
  //set user Role
  // public updateRole = (req: any, res: Response, next: NextFunction) => {
  //   User.updateOne(
  //     { _id: req.userData._id, mobile: req.body.mobile },
  //     { $set: { role: req.body.role } }
  //   )
  //     .then((data) => {
  //       console.log(data);
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  private validateInput(req: Request) {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      const error = new Error("validation failed! please enter valid data");
      throw error;
    }
  }
}
