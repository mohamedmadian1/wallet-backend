import { Router } from "express";
import { UserController } from "../controllers/userController";
import { body } from "express-validator";
import { checkAuth } from "../middleware/jwt-config";

export class userRoutes {
  router: Router;
  public userController: UserController = new UserController();
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    //signup
    this.router.post(
      "/register",
      [body("mobile").isMobilePhone("ar-EG")],
      this.userController.registerUser
    );
    //login
    this.router.post(
      "/login",
      [body("mobile").isMobilePhone("ar-EG")],
      this.userController.authenticateUser
    );
    //get all users
    this.router.get("/users", this.userController.getAllUsers)
    //get single user
    this.router.get("/users/:userId", this.userController.getUser)
    
      //update user
    this.router.patch("/users/:userId", this.userController.updateUser)
    //delete user
    this.router.delete('/users/:userId', this.userController.deleteUser)
    //set role
    this.router.patch("/role",checkAuth,this.userController.updateRole)

  }
}
