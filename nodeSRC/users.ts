import {User} from "./user";

export class Users{
    private usermap : Map<[String,String],User>;
    private maxid : number;
    public get(firstname:String, lastname:String) : User{
        return this.usermap.get([firstname,lastname]);
    }
    public add(u:User) :boolean {
        u.userId = this.maxid;
        if(this.usermap.has([u.firstName,u.lastName])){
            return false;
        }
        this.usermap.set([u.firstName,u.lastName],u);
        return true;
    }
}