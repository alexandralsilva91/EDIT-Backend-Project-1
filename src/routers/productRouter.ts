
import { Router } from 'express';
import { check } from "express-validator";
import productController from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router: Router = Router();

//primeiro parametro é o endpoint
// get all products
router.get("/products", productController.getAll);

//create a new product
router.post("/products", productController.create)

// get types of product
router.get("/products/types", productController.getTypes);

// get brands of products
router.get("/products/brands", productController.getBrands);

//delete a product
router.delete("/products/:id", authMiddleware, productController.delete);

export default router;