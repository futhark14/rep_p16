import { Interest,Interests,SuperInterest } from "../interests";
import {User} from "../user";
import {Users} from "../users";
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
//heavily helped by: https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/

let maindb: Users = new Users();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log(maindb);
    let userId: Number = req.body.userId;
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let age: Number = req.body.age;
    let gender: string = req.body.gender;
    let interests: Interests = Interests.fromJSON(req.body.interests);
    let phonenumber: string = req.body.phonenumber;
    let password: string = req.body.password;
    let u:User = new User(userId, firstName, lastName, age, gender, interests, phonenumber, password);
    console.log(u);
    if(maindb.add(u)){
        return res.status(200).json({
            message: "user created sucessfully"
        })
    }else{
        return res.status(400).json({
            message: "request failed, user may already exist"
        })
    }
}

const editUser = async (req: Request, res: Response, next: NextFunction) => {

}
const editUserInterests = async (req: Request, res: Response, next: NextFunction) => {
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let interests: Interests = Interests.fromJSON(req.body.interests);
    let user = maindb.get(firstName, lastName);

    if(user != undefined && interests != undefined){
        user.interests = interests;
        return res.status(200).json({
            message: "interests edited sucessfully"
        })
    }else {
        return res.status(400).json({
            message: "Error: user may not exist or invalid interests were given"
        })
    }
}
const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    return res.status(200).json({
        message: "test"
    })
}



export default { signUp,editUser,editUserInterests,login };

