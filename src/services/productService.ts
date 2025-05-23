import { IProduct } from '../interfaces/productInterface.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from '../utils/fileUpload.js';

const productsFilePath = './src/data/devices.json'

class ProductService {

    //next function read our products and it's private because it's only used here in productService:
    private read(): IProduct[] {
        try {
            console.log('Reading products');
            return jsonFileReader.read(productsFilePath);
        } catch (error) {
            console.error(`Error reading products: ${error}`);
            throw new Error('Failed to read products');
        }
    }

    private write(products: IProduct[]): void {
        try {
            jsonFileReader.write(productsFilePath, products);
        } catch (error) {
            console.error(`Error writing products: ${error}`);
            throw new Error('Failed to write products')
        }
    }

    getAll = async () => {
        return this.read();
    }

    getOne = async () => { }

    create = async (newProduct: IProduct, image: any): Promise<IProduct> => {
        try {
            newProduct.image_url = 'no-image.jpg';

            if (image) {
                newProduct.image_url = await fileUpload.save(image);
            }

            const products: IProduct[] = this.read();

            newProduct.id = uuidv4();

            products.push(newProduct);

            this.write(products);

            return newProduct;
        } catch (error) {
            console.error(`Error creating a product: ${error}`);
            throw new Error('Failed creating product');
        }
    }

    update = async () => { }

    delete = async (productId: string) => {

        let products = this.read();

        const foundProduct: IProduct | undefined = products.find((product) => product.id === productId);

        if (!foundProduct) {
            return null;
        }

        if (foundProduct.image_url && foundProduct.image_url !== 'no-image.jpg') {
            await fileUpload.delete(foundProduct.image_url)
        }

        products = products.filter((product) => product.id !== productId);

        this.write(products);

        return foundProduct;
    }
}

export default new ProductService();