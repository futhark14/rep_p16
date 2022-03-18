import { Round } from './../round';
import { Interest,Interests,SuperInterest } from "../interests";
import {User} from "../user";
import {Users} from "../users";
import {Session} from '../session';
import { Request, Response, NextFunction } from 'express';
//heavily helped by: https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/

let maindb: Users = new Users();
let mainsession: Session = new Session();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
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
            if(user.gender.toLowerCase() === "male"){
                mainsession.addMale(user);
            }else{
                mainsession.addFemale(user);
            }
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
    return res.status(200).json({
        roundActive: mainsession.isRoundOnGoing(),
        hasEnded: mainsession.hasEnded()
    });
}
const startSession = async (req: Request, res: Response, next: NextFunction) => {
    mainsession.startRound();
    return res.status(200).json({
        status: true
    });
}
const stopSession = async (req: Request, res: Response, next: NextFunction) => {
    mainsession.stopRound();
    return res.status(200).json({
        status: true
    });
}
const endEvent = async (req: Request, res: Response, next: NextFunction) => {
    mainsession.endEvent();
    return res.status(200).json({
        status: true
    });
}
const autoMatch = async (req: Request, res: Response, next: NextFunction) => {
    mainsession.autoMatch();
    return res.status(200).json({
        status: true
    });
}
const manualMatch = async (req: Request, res: Response, next: NextFunction) => {
    let user1 = req.body.malename;
    let user2 = req.body.malename;
    mainsession.planMatch(user1,user2);
    return res.status(200).json({
        status: true
    });
}
const getMatch = async (req: Request, res: Response, next: NextFunction) => {
    let username = req.body.username;
    let password = req.body.password;
    let user : User = maindb.get(username);
    if(user != undefined){
        if(user.password === password){
            let match: [string,string] = mainsession.getCurrentMatch(username);
            if(match !== undefined){
                return res.status(200).json({
                    status: true,
                    name: match[0],
                    message: match[1]
                })
            }
            return res.status(200).json({
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

const getMatches = async (req: Request, res: Response, next: NextFunction) => {
    let round = req.body.round;
    if(round <= mainsession.rounds.length){
        let matches = mainsession.rounds[mainsession.rounds.length-round].matches;
        let returnmatches = matches.map(x => [x.getUser1().getname(),x.getUser2().getname(),x.getmessage(),x.getValue()]);
        return res.status(200).json({
            matches: returnmatches
        });
    }else{
        return res.status(400).json({
            status: false
        });
    }
}
const getUnmatched = async (req: Request, res: Response, next: NextFunction) => {
    let unsortedMales = mainsession.rounds[0].unsortedMales.map(x => {return x.getname()});
    let unsortedFemales = mainsession.rounds[0].unsortedFemales.map(x => {return x.getname()});
    return res.status(200).json({
        males: unsortedMales,
        females: unsortedFemales
    });
}
const getShares =  async (req: Request, res: Response, next: NextFunction) => {
    let username = req.body.username;
    let password = req.body.password;
    let user : User = maindb.get(username);
    if(user != undefined){
        if(user.password === password){
            let users=mainsession.getMutualShares(username);
            let phoneNumbers = new Array<string>();
            for(let i = 0; i < users.length; i++){
                phoneNumbers.push(maindb.get(users[i]).phonenumber);
            }
            return res.status(200).json({
                status: true,
                mutualShares: users,
                phoneNumbers: phoneNumbers
            });
        }
    }
    return res.status(401).json({
        status: false,
        message: "invalid username or password"
    });
}
const setShares =  async (req: Request, res: Response, next: NextFunction) => {
    let username = req.body.username;
    let password = req.body.password;
    let names : Array<string> = req.body.names;
    let user : User = maindb.get(username);
    if(user != undefined){
        if(user.password === password){
            for(let i = 0; i < names.length; i++){
                mainsession.setshare(username,names[i]);
            }
            return res.status(200).json({
                status: true
            });
        }
    }
    return res.status(401).json({
        status: false,
        message: "invalid username or password"
    });
}

export default { signUp,editUserInterests,login,isActive,startSession,stopSession,endEvent,autoMatch,getMatch,getShares,setShares,manualMatch,getMatches,getUnmatched};

