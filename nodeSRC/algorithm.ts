import e from 'express';
import { Interests, Interest, SuperInterest } from './interests';
import { User } from './user';

export class Match{
    private _male : User;
    private _female : User;
    private message : string;

    private matchValue : number;

    getmessage():string{
        return this.message;
    }
    getUser1():User{
        return this._male;
    }
    getUser2():User{
        return this._female;
    }
    getValue():number{
        return this.matchValue;
    }

    constructor(_male:User,_female:User, message:string){
        this._male = _male;
        this._female = _female;
        this.message = message;

        this.matchValue = Match.rateMatch(this._male.interests,this._female.interests);
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