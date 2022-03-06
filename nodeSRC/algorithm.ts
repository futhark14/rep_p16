import e from 'express';
import { Interests, Interest, SuperInterest } from './interests';
import { User } from './user';

class Match{
    private _user1 : User;
    private _user2 : User;
    private message : String;

    private matchValue : number;

    getUser1():User{
        return this._user1;
    }
    getUser2():User{
        return this._user2;
    }

    constructor(user1:User,user2:User, message:string){
        this._user1 = user1;
        this._user2 = user2;

        this.matchValue = Match.rateMatch(this._user1.interests,this._user2.interests);
    }

    static rateMatch(i1 : Interests,i2 : Interests) : number{
        let l = i1.getList();
        let n : number = 0;

        for (let index = 0; index < l.length; index++) {
            const element : SuperInterest = l[index];
            const otherelem : Interest = i2.getInterest(element.name);
            if(otherelem === undefined){
                continue;
            }
            if(element.is_interested && otherelem.is_interested){
                n += 10;
            }else if(element.is_interested && otherelem.is_disinterested || element.is_disinterested && otherelem.is_interested){
                n -= 2*10;
            }
            let subIntersests: Array<Interest> = element.getSubInterests();

            for(let subIndex = 0; subIndex < subIntersests.length; subIndex++){
                const i: Interest = subIntersests[subIndex];
                const j: Interest = i2.getInterest(i.name);
                if(j === undefined){
                    continue;
                }
                if(i.is_interested && j.is_interested){
                    n += 5;
                }else if(i.is_interested && j.is_disinterested || i.is_disinterested && j.is_interested){
                    n -= 2*5;
                }else if(i.is_interested && otherelem.is_interested || j.is_interested && element.is_interested){
                    n += 2;
                }
            }
            
        }
        return n;
    }
}