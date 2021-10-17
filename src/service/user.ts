import { getRepository, getConnection } from 'typeorm';
import { User } from '../entity/user';

class UserService {
    async register(email: string, firstName: string, lastName: string ) {
        // TODO: check if email already exists
        // and if yes return a meaningful error
        // it would make sense to add a general error
        // handling middleware to the server
        // I omitted this to not make the tutorial too complex
        const connection = await getConnection();
        const user = new User();
        user.firstName = firstName;
        user.email = email;
        user.lastName = lastName;
        const userRepo = connection.getRepository(User);
        return userRepo.save(user);
    }
    async getUserById(id:number) {
        // TODO: check if email already exists
        // and if yes return a meaningful error
        // it would make sense to add a general error
        // handling middleware to the server
        // I omitted this to not make the tutorial too complex
        const connection = await getConnection();
        const userRepo = connection.getRepository(User);
        return userRepo.findOne(id);
    }
    async updateUser(id:number, email: string, firstName: string, lastName: string ) {
        // TODO: check if email already exists
        // and if yes return a meaningful error
        // it would make sense to add a general error
        // handling middleware to the server
        // I omitted this to not make the tutorial too complex
        const connection = await getConnection();
        const userRepo = connection.getRepository(User);
        let userToUpdate = await userRepo.findOne(id);
        userToUpdate.email = email;
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        return await userRepo.save(userToUpdate);
    }
    async removeUserById(id:number) {
        // TODO: check if email already exists
        // and if yes return a meaningful error
        // it would make sense to add a general error
        // handling middleware to the server
        // I omitted this to not make the tutorial too complex
        const connection = await getConnection();
        const userRepo = connection.getRepository(User);
        let userToRemove = await userRepo.findOne(id);
        return  await userRepo.remove(userToRemove);
    }

}

export default new UserService();