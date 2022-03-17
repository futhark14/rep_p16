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
    autoMatch(rounds:Array<Round>) {
        const unsortedmalescopy: Array<User> = this.unsortedMales.slice();
        for (let i = 0; i < unsortedmalescopy.length;i++) {
            const male = unsortedmalescopy[i];
            let arr : Array<Match> = new Array<Match>();

            for(let j = 0; j < this.unsortedFemales.length; j++){
                const female = this.unsortedFemales[j];
                let hasMatchedBefore : boolean = false;

                for(let x = 0; x < rounds.length; x++){
                    const round = rounds[x];
                    const match = round.getMatch(female.getname());
                    if(match !== undefined && match[0] === male.getname()){
                        hasMatchedBefore = true;
                        break;
                    }
                }
                if(!hasMatchedBefore){
                    arr.push(new Match(male,female,this.getTable(false)));
                }
            }
            arr.sort((a,b) => {
                return b.getValue() - a.getValue();
            });
            if(arr.length > 0 ){
                this.planmatch(arr[0].getUser1().getname(),arr[0].getUser2().getname());
            }
        }
    }
    planmatch(malename:string,femalename:string){
        if(malename == undefined || femalename == undefined){
            return;
        }else{
            let male = this.unsortedMales.find(x => {return x.getname() === malename});
            let female = this.unsortedFemales.find(x => {return x.getname() === femalename});

            if(male != undefined && female != undefined){
                this.matches.push(new Match(male,female,this.getTable(true)));

                let i = this.unsortedFemales.findIndex(x => {return x.getname() === female.getname()});
                let j = this.unsortedMales.findIndex(x => {return x.getname() === male.getname()});

                this.unsortedFemales.splice(i,1);
                this.unsortedMales.splice(j,1);
            }
        }
    }
    private getTable(doIncrement : boolean){
        if(doIncrement){
            this.tablenumber++;
        }
        return "Table " + this.tablenumber.toString();
    }
    constructor(unsortedMales : Array<User>,unsortedFemales : Array<User>) {
        this.unsortedMales = unsortedMales.slice();
        this.unsortedFemales = unsortedFemales.slice();
        this.tablenumber = 0;
        this.matches = new Array<Match>();
    }
    //returns the first name of the other person and the message, if there is no match return undefined
    getMatch(username : string) : [string,string]{
        let match = this.matches.find(x =>{return (x.getUser1().getname() === username || x.getUser2().getname() === username)});
        if(match === undefined){
            return undefined;
        }else{
            if(match.getUser1().getname() === username){
                return [match.getUser2().getname(),match.getmessage()]
            }else{
                return [match.getUser1().getname(),match.getmessage()]
            }
        }
    }
}