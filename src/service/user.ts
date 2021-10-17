import { getRepository, getConnection } from 'typeorm';
import { User } from '../entity/user';
import {v4 as uuidv4} from 'uuid';
import fs from 'fs'
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

        const connection = await getConnection();
        const userRepo = connection.getRepository(User);
        return userRepo.findOne(id);
    }
    async updateUser(id:number, email: string, firstName: string, lastName: string ) {

        const connection = await getConnection();
        const userRepo = connection.getRepository(User);
        let userToUpdate = await userRepo.findOne(id);
        userToUpdate.email = email;
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        return await userRepo.save(userToUpdate);
    }
    async uploadImageUser(id:number, image:any) {
        if(!image) {
            return {
                status: false,
                message: 'No file uploaded'
            };
        } else {
            const connection = await getConnection();
            const userRepo = connection.getRepository(User);
            let userToAddImage = await userRepo.findOne(id);
            let imageFullName:string;
            if(userToAddImage.image!==null) {
                imageFullName = userToAddImage.image;
            }else{
                let ext = image.name.split('.').pop();
                let fileName = uuidv4();
                imageFullName = `${fileName}.${ext}`
            }

            image.mv('./uploads/' + imageFullName);
            userToAddImage.image = imageFullName;
            return await userRepo.save(userToAddImage);
        }
    }
    async removeUserById(id:number) {

        const connection = await getConnection();
        const userRepo = connection.getRepository(User);
        let userToRemove = await userRepo.findOne(id);
        return  await userRepo.remove(userToRemove);
    }

}

export default new UserService();