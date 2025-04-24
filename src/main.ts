import { Mongoose } from './../node_modules/mongoose/types/index.d';
import express, { Express, Request, Response } from "express";
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from "express-fileupload";
import mongoose from 'mongoose';

dotenv.config();

//a variavel process tem a informaçao sobre o nosso processo do node:
//console.log(process.env.PORT);

const app: Express = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = 'mongodb+srv://alexandrasilvavet:amp4gWtcmAJsgScE@cluster0.toz7vwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(cors({
    origin: '*'
}))


app.use(fileUpload());
app.use(express.static("static"));

app.use(express.json());

// esta função é so p testar se a nossa api esta acessivel:
app.get("/", (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.use('/auth', userRouter); //auth de autenticação
app.use('/api', productRouter);




const startApp = async () => {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to DB');

        app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`);
        });

    } catch (error) {
        console.error('Error connecting to DB:', error)
    }
}

startApp();