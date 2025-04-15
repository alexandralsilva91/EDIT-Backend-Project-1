import { Request, Response } from "express";
import { IProduct } from "../interfaces/productInterface.js";
import productService from "../services/productService.js";

class ProductController {

  getAll = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, type = 'all', brand = 'all', query } = req.query;

      console.log(page);
      console.log(limit);
      console.log(type);
      console.log(brand);
      console.log(query);

      let products: IProduct[] = await productService.getAll();

      if (type && type !== 'all') {
        products = products.filter((product) => product.type === type);
      }

      if (brand && brand !== 'all') {
        products = products.filter((product) => product.brand === brand);
      }

      const pageNumber = parseInt(page as string); // 2ª pág.
      const limitNumber = parseInt(limit as string); // 10 prod. / pág.

      const startIndex = (pageNumber - 1) * limitNumber; // (2 - 1) * 10 = 10
      const endIndex = pageNumber * limitNumber; // 2 * 10 = 20

      products = products.slice(startIndex, endIndex);

      products = products.map((product) => ({
        ...product,
        image_url: `${req.protocol}://${req.get('host')}/${product.image_url}`
      }))

      res.json(products);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't get all products: ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to get products' })
    }
  }

  // getAll = async (req: Request, res: Response) => {
  //     try {
  //         const products: IProduct[] = await productService.getAll();

  //         res.json(products);

  //     } catch (error: unknown) {
  //         if (error instanceof Error) {
  //             console.log(`Can´t get all products: ${error.message}`);
  //         }
  //         res.status(500).json({ error: 'Failed to get products' })
  //     }
  // }
  getTypes = async (req: Request, res: Response) => {
    const products: IProduct[] = await productService.getAll();

    const types = products.map((product) => product.type);

    const uniqueTypes = [...new Set(types)]; //este set elimina os tipos repetidos

    res.json(uniqueTypes);
  }

  getBrands = async (req: Request, res: Response) => {
    const products: IProduct[] = await productService.getAll();

    const brands = products.map((product) => product.brand);

    const uniqueBrands = [...new Set(brands)]; //este set elimina as marcas repetidos da lista de marcas

    res.json(uniqueBrands);
  }

  getOne = async (req: Request, res: Response) => { }

  create = async (req: Request, res: Response) => {
    try {
      const newProduct = req.body;

      const image = req.files?.image;

      const createdProduct = await productService.create(newProduct, image);

      res.status(201).json(createdProduct);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't get all products: ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to get products' })
    }
  }

  update = async (req: Request, res: Response) => { }


  delete = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await productService.delete(productId);

      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(deletedProduct);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't delete product: ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to delete product' })
    }
  }
}

export default new ProductController();