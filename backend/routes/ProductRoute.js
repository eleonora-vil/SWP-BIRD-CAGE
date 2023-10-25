const express = require("express");
const ProductController = require("../controllers/ProductController")

const productRouter = express.Router();
productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/cate/:code", ProductController.getProductsByCategory);

productRouter.get("/search/:name", ProductController.getProductByName)
productRouter.post("/add", ProductController.getNewProductToDB);
productRouter.post("/update", ProductController.updateProduct);
productRouter.get("/rating/:id", ProductController.getRatingByProductId);
productRouter.post("/rating", ProductController.addRating);
productRouter.get("/paging/", ProductController.paging);
productRouter.post("/filter/", ProductController.filterProduct);
productRouter.get("/:id", ProductController.getProductById);
productRouter.delete("/:id", ProductController.deleteProduct);




module.exports = productRouter;