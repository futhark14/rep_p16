import {Interests,Interest,SuperInterest} from "./interests";
export class User {
    private _userId: Number;
    private _firstName: string;
    private _lastName: string;
    private _age: Number;
    private _gender: string;
    private _interests: Interests;
    private _phonenumber: string;
    private _password: string;

    public get userId(): Number {
        return this._userId;
    }
    public set userId(value: Number) {
        this._userId = value;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get age(): Number {
        return this._age;
    }
    public set age(value: Number) {
        this._age = value;
    }
    public get gender(): string {
        return this._gender;
    }
    public set gender(value: string) {
        this._gender = value;
    }
    public get interests(): Interests {
        return this._interests;
    }
    public set interests(value: Interests) {
        this._interests = value;
    }
    public get phonenumber(): string {
        return this._phonenumber;
    }
    public set phonenumber(value: string) {
        this._phonenumber = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    constructor(userId: Number, firstName: string, lastName: string, age: Number, gender: string, interests: Interests, phonenumber: string, password: string) {
        this._userId = userId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
        this._gender = gender;
        this._interests = interests;
        this._phonenumber = phonenumber;
        this._password = password;
    }
}

 