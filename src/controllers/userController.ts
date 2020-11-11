import { role } from "./../models/role";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, User } from "../models/user";
import { validationResult } from "express-validator";
import { send } from "process";

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
      const newUser = new User({
        name: name,
        mobile: mobile,
        password: hashedPass,
        balance: 1000,
        role: "client",
      });
      newUser
        .save()
        .then((result) => {
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

    let currentUser: IUser;
    User.findOne({ mobile: req.body.mobile })
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
          { mobile: currentUser.mobile, userId: currentUser._id },
          "secret_This_should_be_longer",
          { expiresIn: "1h" }
          // {role:currentUser.role}
        );
        res.status(200).json({
          token: token,
          _id: currentUser._id,
          expiresIn: 3600,
          role: currentUser.role,
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
    User.find()
    .then(users=>{
      res.status(200).json({message:"users fetched successfully!", users:users})
    }).catch(err=>{
      console.log(err)
    })
  };

  //Delete user
  

  //set user Role
  public updateRole = (req: any, res: Response, next: NextFunction) => {
    User.updateOne(
      { _id: req.userData._id, mobile: req.body.mobile },
      { $set: { role: req.body.role } }
    )
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  private validateInput(req: Request) {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      const error = new Error("validation failed! please enter valid data");
      throw error;
    }
  }
}
