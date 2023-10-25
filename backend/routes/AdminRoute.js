const express = require('express');
const AdminController = require("../controllers/AdminController");


const AdminRouter = express();

AdminRouter.get("/get5Month", AdminController.getOrderBy5Month);

AdminRouter.get("/getBestSelling", AdminController.getBestSellingProducts);

AdminRouter.get("/getUsers", AdminController.getAllUser);

AdminRouter.delete("/deleteUser", AdminController.deleteUser);

AdminRouter.get("/updateUser", AdminController.updateUser);

AdminRouter.get("/")
module.exports = AdminRouter;