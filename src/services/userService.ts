import { IUser } from '../interfaces/userinterface.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import tokenService from '../utils/tokenService.js';
import bcrypt from 'bcrypt';



const usersFilePath = './src/data/users.json'

class UserService {

    //next function read our users and it's private because it's only used here in userservice:
    private read(): IUser[] {
        try {
            console.log('Reading users');
            return jsonFileReader.read(usersFilePath);
        } catch (error) {
            console.error(`Error reading users: ${error}`);
            throw new Error('Failed to read users');
        }
    }

    private write(users: IUser[]): void {
        try {
            jsonFileReader.write(usersFilePath, users);
        } catch (error) {
            console.error(`Error writing users: ${error}`);
            throw new Error('Failed to write users')
        }
    }

    getAll = async () => {
        return this.read();
    }

    getOne = async () => { }

    login = async (email: string, password: string): Promise<{
        user:IUser,
        accessToken: string,
    } | null> => { 
        try {
                const users: IUser[] = this.read();
                const foundUser = users.find(user => user.email === email);
                    if (!foundUser) {
                        return null
                    }
                    if (!await bcrypt.compare(password, foundUser.password)) {
                        return null
                    }

                const accessToken = tokenService.generateAccessToken(foundUser);

                return { user : foundUser, accessToken: accessToken };
        } catch(error) {
                console.error(`Error logging in user: ${error}`);
                throw new Error('Failed to login user');
        }}

    register = async (newUser: IUser): Promise<{
        user: IUser
        accessToken: string
    } | null> => {
        try {
            const users: IUser[] = this.read();

            const foundUser = users.find(user => user.email === newUser.email);
            if (foundUser) {
                return null;
            }

            newUser.id = uuidv4();
            newUser.password = await bcrypt.hash(newUser.password, 7);

            users.push(newUser);

            this.write(users);

            const accessToken = tokenService.generateAccessToken(newUser);

            return { user: newUser, accessToken: accessToken };
        } catch (error) {
            console.error(`Error creating a product: ${error}`);
            throw new Error('Failed creating product');
        }
    }

    update = async () => { }

    delete = async () => { }


}

export default new UserService();