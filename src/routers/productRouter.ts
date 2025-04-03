
import { Router } from 'express';
import { check } from "express-validator";
import productController from '../controllers/productController.js';

const router: Router = Router();

//primeiro parametro é o endpoint
// get all products
router.get("/products", productController.getAll);

//create a new product
router.post("/products", productController.create)

export default router;