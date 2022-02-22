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

    let int:Interests = new Interests();
    test('set, get & remove', ()=>{
        expect(int.getInterest("Cooking")).toBeUndefined();
        int.setInterest(new SuperInterest("Home",0));
        expect(int.getInterest("Cooking")).toBeUndefined();
        int.setSubInterest(new Interest("Cooking",0),"Home");
        expect(int.getInterest("Cooking")).toStrictEqual(new Interest("Cooking",0));
        int.removeInterest("Home");
        expect(int.getInterest("Cooking")).toBeUndefined();
        expect(int.getInterest("Home")).toBeUndefined();
    });
    test('interested functions', ()=>{
        int.setInterest(new SuperInterest("Home",0));
        int.setSubInterest(new Interest("Cooking",0),"Home");
        
        int.setInterested("Cooking");

        expect(int.getInterest("Home").is_indifferent());
        expect(int.getInterest("Cooking").is_interested());

        int.setDisinterested("Cooking");

        expect(int.getInterest("Home").is_indifferent());
        expect(int.getInterest("Cooking").is_disinterested());

        int.setIndifferent("Cooking");
        int.setInterested("Home");

        expect(int.getInterest("Home").is_interested());
        expect(int.getInterest("Cooking").is_indifferent());
    })
}
)




