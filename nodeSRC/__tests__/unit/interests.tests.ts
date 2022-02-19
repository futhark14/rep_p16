import { Interest, Interests, SuperInterest } from '../../interests';

describe('Interest tests', () => {
    let int:Interest = new Interest("name", 0);
    test('all values correct', () => {
        expect(int).not.toBeNull();
        expect(int.name).toEqual("name");
        expect(int.is_indifferent());
        expect(!int.is_disinterested());
        expect(!int.is_interested());
    });
    int = new Interest("name", 1);
    test('all values correct', () => {
        expect(int).not.toBeNull();
        expect(int.name).toEqual("name");
        expect(!int.is_indifferent());
        expect(!int.is_disinterested());
        expect(int.is_interested());
    });
    int = new Interest("name",-1);
    test('all values correct', () => {
        expect(int).not.toBeNull();
        expect(int.name).toEqual("name");
        expect(!int.is_indifferent());
        expect(int.is_disinterested());
        expect(!int.is_interested());
    });
}
)
describe('SuperInterest tests', () => {
    let int:SuperInterest = new SuperInterest("Ridning", 1);
    test('all values correct', () => {
        expect(int).not.toBeNull();
        expect(int.name).toEqual("Ridning");
        expect(!int.is_indifferent());
        expect(!int.is_disinterested());
        expect(int.is_interested());
    });
    int.addSubInterest(new Interest ("pony",0));
    test('insert', ()=>{
        expect(int.getSubInterest("pony").name).not.toBeNull();
        expect(int.getSubInterest("pony").name).toBe("pony");
        expect(int.getSubInterest("aavb")).toBeUndefined();
        int.removeSubInterest("pony");
        expect(int.getSubInterest("pony")).toBeUndefined();
    })
}
)
describe('Interests tests', () => {

}
)




