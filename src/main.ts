import express, { Express, Request, Response } from "express";
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app: Express = express();
const PORT = 4000;

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

