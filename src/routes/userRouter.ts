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

    //set role
    this.router.patch("/role",checkAuth,this.userController.updateRole)
  }
}
