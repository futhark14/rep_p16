import { Interest,Interests,SuperInterest } from "../interests";
import {User} from "../user";
import {Users} from "../users";
import {Session} from '../session';
import { Request, Response, NextFunction } from 'express';
//heavily helped by: https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/

let maindb: Users = new Users();
let mainsession: Session = new Session();

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
    if(maindb.add(u)){
        if(gender.toLowerCase() === "male"){
            mainsession.addMale(u);
        }else{
            mainsession.addFemale(u);
        }
        return res.status(200).json({
            status: true,
            message: "user created sucessfully"
        })
    }else{
        return res.status(400).json({
            status: false,
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
    let user = maindb.get(firstName + " " + lastName);

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
    let username = req.body.username;
    let password = req.body.password;

    let user : User = maindb.get(username);
    if(user != undefined){
        if(user.password === password){
            return res.status(200).json({
                status: true,
                message: "logged in sucessfully as " + username,
                username: username
            })
        }
    }
    return res.status(401).json({
        status: false,
        message: "username or password is invalid",
    })
    
}
const isActive = async (req: Request, res: Response, next: NextFunction) => {
    if(mainsession.isongoing()){
        return res.status(200).json({
            status: true
        });
    }
    return res.status(200).json({
        status: false
    });
}
const startSession = async (req: Request, res: Response, next: NextFunction) => {
    mainsession.startSession();
}
const stopSession = async (req: Request, res: Response, next: NextFunction) => {
    mainsession.stopSession();
}
const getMatch = async (req: Request, res: Response, next: NextFunction) => {
    let username = req.body.username;
    let password = req.body.password;
    let user : User = maindb.get(username);
    if(user != undefined){
        if(user.password === password){
            let match: [string,string] = mainsession.getCurrentMatch(username);
            if(match != undefined){
                return res.status(200).json({
                    status: true,
                    name: match[0],
                    message: match[1]
                })
            }
            return res.status(401).json({
                status: false,
                message: "No match"
            })
        }
    }
    
    return res.status(401).json({
        status: false,
        message: "faulty login"
    })
    
}

export default { signUp,editUser,editUserInterests,login };

