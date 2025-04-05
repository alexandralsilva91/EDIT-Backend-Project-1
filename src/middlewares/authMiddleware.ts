import { Request, Response, NextFunction } from "express";
import tokenService from "../utils/tokenService.js";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({error: 'Unauthorized'});
    }

    const splitedToken = token?.split(' ')[1];

    const decodedPayload = tokenService.validateAccessToken(splitedToken);

    if (!decodedPayload) {
        res.status(401).json({ error: 'Invalid Bearer Token' })
    }

    next();
}