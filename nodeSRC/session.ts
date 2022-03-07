import {User} from './user';
import {Round} from './round';
//session stores the currently logged in users for the current session along with all matching rounds
export class Session{
    males: Array<User>;
    females : Array<User>;
    roundongoing : boolean;
    rounds : Array<Round>;
    current : number;

    addMale(male:User){
        this.males.push(male);
        this.rounds[0].addMale(male);
    }
    
    addFemale(female:User){
        this.males.push(female);
        this.rounds[0].addFemale(female);
    }

    startSession(){
        if(this.current == 0){return;}

        if(!this.roundongoing){
            this.roundongoing = true;
        }
    }
    stopSession(){
        if(this.current == 0){return;}
        
        if(this.roundongoing){
            this.roundongoing = false;
        }
    }
    isongoing():boolean{
        return this.roundongoing;
    }
    getCurrentMatch(username: string){
        return this.rounds[0].getMatch(username); 
    }
    constructor(){
        this.roundongoing = false;
        this.rounds = new Array<Round>();
        this.current = 0;
        this.males = new Array<User>;
        this.females = new Array<User>;
    }
}