import {User} from "./user";

export class Users{
    private usermap : Map<string,User>;
    private maxid : number;
    public get(firstname:string, lastname:string) : User{
        return this.usermap.get(firstname.concat(" ",lastname));
    }
    public add(u:User) :boolean {
        u.userId = this.maxid;
        if(this.usermap.has(u.firstName.concat(" ",u.lastName))){
            return false;
        }
        this.usermap.set(u.firstName.concat(" ",u.lastName),u);
        return true;
    }
    constructor() {
        this.usermap = new Map<string,User>();
        this.maxid = 0;
    }
}