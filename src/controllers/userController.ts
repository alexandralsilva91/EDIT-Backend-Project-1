import express, { Response, Request } from 'express';
import { validationResult } from "express-validator";
import { readFileSync } from 'fs';
import { IUser } from '../interfaces/userinterface.js';

let users: IUser[] = JSON.parse(readFileSync('./src/data/users.json', 'utf-8'));

class UserController {
    // get all users:
    getAllUsers(req: Request, res: Response) {
        res.json(users);
    }
    
    //get user by id:
    getUserById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const foundUser = users.find((user) => user.id === userId);
    
        //foundUser === null || foundUser === undefined
        if (!foundUser) {
            res.status(404).send('User not found')
            return
        }
        res.json(foundUser);
    }

    //register/create a new user
    register(req: Request, res: Response) {

        const { name, email, password } = req.body;
    
        const errors = validationResult(req);
        console.log(errors);
    
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() })
        }
    
        const foundUser = users.find(user => user.email === email);
        if (foundUser) {
            res.status(400).json({ error: 'User already exists' })
        }
    
        console.log(name);
        console.log(email);
    
        const newUser: IUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password
        }
        users.push(newUser); //adds new user to the users array
    
        res.status(201).send(newUser);
    
        res.json("Ok! Vou criar, calma")
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
        const userId = parseInt(req.params.id);
    
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
        const userId = parseInt(req.params.id);
    
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







