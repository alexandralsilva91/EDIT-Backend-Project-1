import express, { Response, Request } from 'express';
import { validationResult } from "express-validator";
import { readFileSync } from 'fs';
import { IUser } from '../interfaces/userinterface.js';
import userService from '../services/userService.js';

let users: IUser[] = JSON.parse(readFileSync('./src/data/users.json', 'utf-8'));

class UserController {
    // get all users:
    getAllUsers(req: Request, res: Response) {
        res.json(users);
    }

    //get user by id:
    getUserById(req: Request, res: Response) {
        const userId = req.params.id;
        const foundUser = users.find((user) => user.id === userId);
    
        //foundUser === null || foundUser === undefined
        if (!foundUser) {
            res.status(404).send('User not found')
            return
        }
        res.json(foundUser);
    }

    //register/create a new user
    register = async (req: Request, res: Response) => {
        try {
        const errors = validationResult(req);
        console.log(errors);
    
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() })
            return
        }

        const createdUserWithToken = await userService.register(req.body);
        if (!createdUserWithToken) {
            res.status(404).json({ error: "User already exists" });
            return;
        }
    
        res.status(201).send(createdUserWithToken);
    
        res.json("Ok! Vou criar, calma")
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Can´t register a new user: ${error.message}`);
        }
        res.status(500).json({ error: 'Can´t register a new user' })
    }
    }

    //login
    login(req: Request, res: Response) {
        /* 
        validar email/pwd
        procurar user pelo email
        comparar a pass do utilizador encontrado
        caso palavras passe coincididrem retornar o user
        */
    
        const { email, password } = req.body;
    
        const foundUser = users.find(user => user.email === email);
        if (!foundUser) {
            res.status(404).json('error: user with this email doesn\'t exist')
            return
        }
        if (foundUser?.password !== password) {
            res.status(400).json('error: Password doesn\'t match');
            return
        }
        if (foundUser?.password === password) {
            res.json(foundUser);
        }
    }

    //update an user
    update(req: Request, res: Response) {
        const userId = req.params.id;
    
        const { name } = req.body;
    
        const foundUser: IUser | undefined = users.find((user) => user.id === userId);
    
        if (!foundUser) {
            res.status(404).send('User not found')
            return
        }
    
        if (foundUser) {
            foundUser.name = name;
        }
    
        res.json(foundUser);
    }

    //delete an user
    delete(req: Request, res: Response) {
        const userId = req.params.id;
    
        const foundUser: IUser | undefined = users.find((user) => user.id === userId);
    
        if (!foundUser) {
            res.status(404).send('User not found')
            return
        }
    
        if (foundUser) {
            users = users.filter((user) => user.id !== userId);
        }
    
        console.log(users)
    
        res.json(foundUser);
    }
}

export default new UserController();







