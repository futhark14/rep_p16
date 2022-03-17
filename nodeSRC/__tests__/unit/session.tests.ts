import { Interests } from "../../interests";
import { Session } from "../../session";
import { User } from "../../user";


describe('Session testing', () =>{
    let s: Session = new Session();
    let male1 : User = new User(0,"male1","lastname",25,"male",new Interests(),"1","password");
    let male2 : User = new User(1,"male2","lastname",25,"male",new Interests(),"2","password");
    let male3 : User = new User(2,"male3","lastname",25,"male",new Interests(),"3","password");
    
    let female1 :User= new User(3,"female1","lastname",25,"female",new Interests(),"4","password");
    let female2 :User= new User(4,"female2","lastname",25,"female",new Interests(),"5","password");
    let female3 :User= new User(5,"female3","lastname",25,"female",new Interests(),"6","password");
    let female4 :User= new User(6,"female4","lastname",25,"female",new Interests(),"7","password");

    s.addMale(male1);
    s.addMale(male2);
    s.addMale(male3);

    s.addFemale(female1);
    s.addFemale(female2);
    s.addFemale(female3);
    s.addFemale(female4);
    test('adding', ()=>{
        expect(s.rounds[0].unsortedFemales.length).toBe(4);
        expect(s.rounds[0].unsortedMales.length).toBe(3);
    })
    test('manual matching', ()=> {
        s.planMatch(male1.getname(),female1.getname());
        s.planMatch(male2.getname(),female2.getname());
        s.planMatch(male3.getname(),female3.getname());
        s.startRound();
        
        expect(s.getCurrentMatch(male1.getname())[0]).toEqual(female1.getname());
        expect(s.getCurrentMatch(male2.getname())[0]).toEqual(female2.getname());
        expect(s.getCurrentMatch(female3.getname())[0]).toEqual(male3.getname());
        expect(s.getCurrentMatch(female4.getname())).toBeUndefined();
        s.stopRound();
    });

    test('auto match', ()=>{
        expect(s.rounds[0].unsortedFemales.length).toBe(4);
        expect(s.rounds[0].unsortedMales.length).toBe(3);

        s.autoMatch();
        s.startRound();

        expect(s.rounds[0].unsortedFemales.length).toBe(1);
        expect(s.rounds[0].unsortedMales.length).toBe(0);
        s.stopRound();
        
        expect(s.rounds[0].unsortedFemales.length).toBe(4);
        expect(s.rounds[0].unsortedMales.length).toBe(3);

        s.autoMatch();
        
        expect(s.rounds[0].unsortedFemales.length).toBe(1);
        expect(s.rounds[0].unsortedMales.length).toBe(0);
        s.stopRound();
    })

    test('end Event & sharing phone numbers', ()=>{
        s.endEvent();
        s.setshare(male1.getname(),female1.getname());
        s.setshare(female1.getname(),male1.getname());
        expect(s.getMutualShares(male1.getname())[0]).toBe(female1.getname());
    }
    )
    
})

