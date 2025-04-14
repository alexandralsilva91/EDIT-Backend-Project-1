import express, { Express, Request, Response } from "express";
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

//a variavel process tem a informaçao sobre o nosso processo do node:
//console.log(process.env.PORT);

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: '*'
}))

app.use(express.json());

// esta função é so p testar se a nossa api esta acessivel:
app.get("/", (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.use('/auth', userRouter); //auth de autenticação
app.use('/api', productRouter);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});

