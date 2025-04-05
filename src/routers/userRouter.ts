
import { Router } from 'express';
import { check } from "express-validator";
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router: Router = Router();

//primeiro parametro é o endpoint
// get all users
router.get("/users", authMiddleware, userController.getAllUsers);

//get user by id
router.get("/users/:id", userController.getUserById);

//create an user
router.post("/users/register", [
    check('email').isEmail().withMessage('Email invalid'),
    check('password').isStrongPassword().withMessage('Pass should be strong'),
    check('name').isLength({ min: 2, max: 100 }).withMessage('Name should have at least 2 chars')
], userController.register);

// login
router.post('/users/login', [
    check('email').isEmail().withMessage('Email invalid'),
    check('password').isStrongPassword().withMessage('Pwd invalid'),
] , userController.login);

//update an user
router.put("/users/:id", userController.update);

// delete an user
router.delete("/users/:id", userController.delete);

export default router;