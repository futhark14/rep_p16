import { Match } from './algorithm';
import {User} from './user'

export class Round{
    unsortedMales : Array<User>;
    unsortedFemales : Array<User>;
    matches : Array<Match>;
    tablenumber : number;
    addMale(user:User){
        this.unsortedMales.push(user);
    }
    addFemale(user:User){
        this.unsortedFemales.push(user);
    }
    //Round is an array of rounds that contains all PREVIOUS rounds
    autoMatch(rounds:Array<Round>){

    }
    planmatch(malename:string,femalename:string){
        if(malename == undefined || femalename == undefined){

        }else{
            let male = this.unsortedMales.find(x => {x.getname() === malename});
            let female = this.unsortedFemales.find(x => {x.getname() === femalename});

            if(male != undefined && female != undefined){
                this.matches.push(new Match(male,female,this.getTable()));
            }
        }
    }
    getTable(){
        this.tablenumber++;
        return "Table " + this.tablenumber.toString();
    }
    constructor(unsortedMales : Array<User>,unsortedFemales : Array<User>) {
        this.unsortedMales = unsortedMales;
        this.unsortedFemales = unsortedFemales;
        this.tablenumber = 0;
    }
    //returns the first name of the other person and the message, if there is no match return undefined
    getMatch(username : string) : [string,string]{
        let match = this.matches.find(x =>{x.getUser1().getname() === username || x.getUser2().getname() === username});
        if(match === undefined){
            return undefined;
        }else{
            if(match.getUser1().getname() === username){
                return [match.getUser2().firstName,match.getmessage()]
            }
        }
    }
}