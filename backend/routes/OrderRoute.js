const express = require("express");
const OrderController = require("../controllers/OrderController");

const OrderRouter = express.Router();

// no parameter
OrderRouter.route("/").get(OrderController.getAllOrder)


OrderRouter.route("/:id").get(OrderController.getOrderById)

OrderRouter.route("/addordertodb").post(OrderController.addOrderToDB)

OrderRouter.route("/list/:id").get(OrderController.getAllOrderItemByUserID)

OrderRouter.route("/changeUnPaidToPaid/:id").get(OrderController.changeStatus_Paid);


module.exports = OrderRouter;