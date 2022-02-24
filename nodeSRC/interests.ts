import { json } from 'express';
import { StringMappingType } from "typescript";
import interests from "./controllers/interests";
export class Interest {
    private _name: string;
    //state  > 0 is interested
    //state  < 0 is disinterested
    //state == 0 is neutral
    private state: Number;

    public set_interested(){
        this.state = 1;
    }
    public set_disinterested(){
        this.state = -1;
    }
    public set_indifferent(){
        this.state = 0;
    }

    public is_interested() : boolean{
        return this.state > 0;
    }
    
    public is_disinterested() : boolean{
        return this.state < 0;
    }
    public is_indifferent(): boolean{
        return this.state == 0;
    }

    public set name(name:string){
        this._name = name;
    }
    public get name(){
        return this._name;
    }
    constructor(name:string,state:number){
        this._name = name;
        this.state = state;
    }
}

export class SuperInterest extends Interest {
    private subInterests: Array<Interest>;

    public addSubInterest(i:Interest){
        this.subInterests.push(i);
    }
    public removeSubInterest(s:string){
        let i: number = this.subInterests.findIndex(x => x.name == s);
        this.subInterests.splice(i,1); 
    }
    public getSubInterest(name:string) : Interest{
        return this.subInterests.find(x => x.name == name);
    }
    constructor(name:string,state:number){
        super(name,state);
        this.subInterests = new Array<Interest>();
    }
    
}

export class Interests 
{
    private interests: Map<string,SuperInterest> = new Map<string,SuperInterest>();
    
    public setInterest(i:SuperInterest)
    {
        this.interests.set(i.name,i);
    }

    public removeInterest(s:string)
    {
        this.interests.delete(s);
    }

    public setSubInterest(i:Interest,superName:string,){
        let test:SuperInterest = this.interests.get(superName);
        if(test == undefined){return false;}
        test.addSubInterest(i);
        return true;
    }

    public getList() : Array<SuperInterest>
    {
        return Array.from(this.interests.values());
    }
    private findInterest(name:string){
        let test:Interest = this.interests.get(name);
        if(test == undefined){
            let l = this.getList();
            for(let i:number = 0; i < l.length; i++){
                test = l[i].getSubInterest(name);
                if(test != undefined){
                    return test;
                }
            }
        }
        return test;
    }
    public getInterest(name:string) : Interest{
        return this.findInterest(name);
    }

    
    public setInterested(name:string){
        let int:Interest = this.findInterest(name);
        if(int == undefined){return;}
        else {int.set_interested();}
    }
    public setDisinterested(name:string){
        let int:Interest = this.findInterest(name);
        if(int == undefined){return;}
        else {int.set_disinterested;}
    }
    public setIndifferent(name:string){
        let int:Interest = this.findInterest(name);
        if(int == undefined){return;}
        else {int.set_indifferent();}
    }
    constructor(){

    }
    public toJSON(){
        const retval = {
            interests : Object.fromEntries(this.interests) 
        }
        return retval;
    }
    public static fromJSON(j) : Interests{
        let i:Interests = new Interests();
        i.interests = new Map(j["interests"]);
        return i;
    }
}

