import { Request, Response } from "express";
import { IProduct } from "../interfaces/productInterface.js";
import productService from "../services/productService.js";

class ProductController {

    getAll = async (req: Request, res: Response) => { 
        try {
            const products: IProduct[] = await productService.getAll();

            res.json(products);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`Can´t get all products: ${error.message}`);
            }
            res.status(500).json({ error: 'Failed to get products' })
        }
    }

    getOne = async (req: Request, res: Response) => { }

    create = async (req: Request, res: Response) => { 
        try {
            const newProduct = req.body;

            const createdProduct = await productService.create(newProduct);
            
            res.status(201).json(createdProduct);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`Can't get all products: ${error.message}`);
            }
            res.status(500).json({ error: 'Failed to get products' })
        }
    }

    update = async (req: Request, res: Response) => { }

    delete = async (req: Request, res: Response) => { }


}

export default new ProductController();