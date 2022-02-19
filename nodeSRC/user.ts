import {Interests,Interest,SuperInterest} from "./interests";
class User {
    private _userId: Number;
    private _firstName: String;
    private _lastName: String;
    private _age: Number;
    private _gender: String;
    private _interests: Interests;
    private _phonenumber: String;
    private _password: String;

    public get userId(): Number {
        return this._userId;
    }
    public set userId(value: Number) {
        this._userId = value;
    }
    public get firstName(): String {
        return this._firstName;
    }
    public set firstName(value: String) {
        this._firstName = value;
    }
    public get lastName(): String {
        return this._lastName;
    }
    public set lastName(value: String) {
        this._lastName = value;
    }
    public get age(): Number {
        return this._age;
    }
    public set age(value: Number) {
        this._age = value;
    }
    public get gender(): String {
        return this._gender;
    }
    public set gender(value: String) {
        this._gender = value;
    }
    public get interests(): Interests {
        return this._interests;
    }
    public set interests(value: Interests) {
        this._interests = value;
    }
    public get phonenumber(): String {
        return this._phonenumber;
    }
    public set phonenumber(value: String) {
        this._phonenumber = value;
    }
    public get password(): String {
        return this._password;
    }
    public set password(value: String) {
        this._password = value;
    }
}

