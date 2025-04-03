// import Router from "express";
// import { check } from "express-validator";

// const router: Router = express.Router();

// let products: IProduct[] = JSON.parse(readFileSync(productsPath, 'utf-8'));

// // TPC: CRUD products
// // Get all products (with status ACTIVE)
// // Get product by ID
// // create a new product
// // update an exisiting product
// // delete an product (safe delete, -> status INACTIVE)

// interface IProduct {
//     name: string,
//     id: number,
//     desc: string,
//     price: number,
//     isActive: boolean // true / false
// }

// // Get all products (with status ACTIVE)
// router.get("/products", (req: Request, res: Response) => {
//     const activeProducts = products.map((product) => product.isActive === true)
//     if(!activeProducts) {
//         res.status(404).send('Active products not found')
//     }
//     res.json(activeProducts);
// });

// //Get product by ID
// router.get("/products/id:", (req: Request, res: Response) => {
//     const productID = parseInt(req.params.id);
//     const foundProduct = products.find((product) => product.id === productID);
    
//     if(!foundProduct) {
//         res.status(404).send('Product not found')
//     }
//     res.json(foundProduct);
// });

// // create a new product
// router.post("/products/register", [
//     //check('name').isLenght({min: 2, max: 50}).withMessage('Name should have at least 2 chars'),
//     //check('id')
//     //check('desc')
//     //check('price')
//     //check('isActive')
// ], (req: Request, res: Response) => {

//     const { name, id, desc, price, isActive } = req.body;

//     const errors = validationResult(req);
//     console.log(errors);

//     if(!errors.isEmpty()) {
//         res.status(422).json({errors: errors.array()})
//     }

//     const newProduct: IProduct = {
//         name: name,
//         id: products.length + 1,
//         desc: desc,
//         price: price,
//         isActive: isActive
//     }

//     products.push(newProduct);

//     res.status(201).send(newProduct);
//     res.json("Produto registado!")
// });

// // update an exisiting product
// router.put("/products/:id", (req: Request, res: Response) => {
//     const productID = parseInt(req.params.id);

//     const { price } = req.body;

//     const foundProduct: IProduct | undefined = products.find((product) => product.id === productID);
//     if(!foundProduct) {
//         res.status(404).send('Product not found')
//     }
//     if(foundProduct) {
//         foundProduct.price = price;
//     }
//     res.json(foundProduct);
// });

// // delete an product (safe delete, -> status INACTIVE)

// router.delete("/products/:id", (req: Request, res: Response) => {
//     const productID = parseInt(req.params.id);

//     const foundProduct: IProduct | undefined = products.find((product) => product.id === productID);
//     if (!foundProduct) {
//         res.status(404).send('Product not found')
//     }
//     if (foundProduct) {
//         foundProduct.isActive = false
//     }

//     console.log(products);
//     res.json(foundProduct);
// });

// export default router;
