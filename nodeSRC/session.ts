import {User} from './user';
import {Round} from './round';
//session stores the currently logged in users for the current session along with all matching rounds
export class Session{
    males: Array<User>;
    females : Array<User>;
    roundongoing : boolean;
    eventongoing : boolean;
    rounds : Array<Round>;
    current : number;
    sharesWith : Map<string,Array<string>>;

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
            this.rounds.push(new Round(this.males,this.females));
        }
    }
    isRoundOnGoing():boolean{
        return this.roundongoing;
    }
    hasEnded():boolean{
        return !this.eventongoing;
    }
    getCurrentMatch(username: string){
        return this.rounds[0].getMatch(username); 
    }
    endEvent(){
        this.eventongoing = false;
    }
    autoMatch(){
        const [head, ...tail] = this.rounds;
        head.autoMatch(tail);
    }
    setshare(username: string,usernameToShareWith : string){
        if(!this.eventongoing){
            let s = this.sharesWith.get(username);
            if(s !== undefined){
                s.push(usernameToShareWith);
            }else{
                s = new Array<string>(usernameToShareWith);
            }
            this.sharesWith.set(username,s);
        }
    }
    getMutualShares(username : string) : Array<string>{
        let s = this.sharesWith.get(username);
        if(s !== undefined){
            let arr = new Array<string>();
            for(let i = 0; i <s.length; i++){
                let other = this.sharesWith.get(s[i]);
                if(other != undefined && other.includes(username)){
                    arr.push(s[i]);
                }
            }
            return arr;
        }else{
            return [];
        }
    }
    constructor(){
        this.roundongoing = false;
        this.eventongoing = true;
        this.rounds = new Array<Round>();
        this.current = 0;
        this.males = new Array<User>;
        this.females = new Array<User>;
        this.rounds.push(new Round(this.males,this.females));
    }
}