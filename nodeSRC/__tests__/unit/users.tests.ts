import { Interest, Interests, SuperInterest } from '../../interests';
import { User} from '../../user';

describe('User tests', () => {
    let u:User = new User(0,"Jane","Doe",32,"Female",new Interests(),"202-555-0171","Password");
    test('check values',()=>{
        expect(u.userId).toStrictEqual(0);
        expect(u.firstName).toStrictEqual("Jane");
        expect(u.lastName).toStrictEqual("Doe");
        expect(u.age).toStrictEqual(32);
        expect(u.gender).toStrictEqual("Female");
        expect(u.interests).toStrictEqual(new Interests);
        expect(u.phonenumber).toStrictEqual("202-555-0171");
        expect(u.password).toStrictEqual("Password");
    })
})