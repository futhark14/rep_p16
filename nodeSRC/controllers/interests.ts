import { Interest,Interests,SuperInterest } from "../interests";
import { Request, Response, NextFunction, json } from 'express';

const getInterests = async (req: Request, res: Response, next: NextFunction) => {
    let i:Interests = generateInterests();
    console.log(i);
    console.log(JSON.stringify(i));
    return res.status(200).json(JSON.stringify(i));
}

function generateInterests() : Interests{
    let i:Interests = new Interests();
    i.setInterest(new SuperInterest("Music",0));
    i.setSubInterest(new Interest("punk",0),"Music");
    i.setSubInterest(new Interest("noise",0),"Music");
    i.setSubInterest(new Interest("avant garde",0),"Music");
    i.setSubInterest(new Interest("rock",0),"Music");
    i.setSubInterest(new Interest("orchestral",0),"Music");
    i.setSubInterest(new Interest("pop",0),"Music");
    i.setSubInterest(new Interest("hip hop",0),"Music");
    i.setSubInterest(new Interest("jazz",0),"Music");
    i.setSubInterest(new Interest("blues",0),"Music");
    i.setSubInterest(new Interest("other",0),"Music");
    i.setInterest(new SuperInterest("Video Games",0));
    i.setSubInterest(new Interest("Roleplaying games",0),"Video Games");
    i.setSubInterest(new Interest("FPS",0),"Video Games");
    i.setSubInterest(new Interest("Strategy",0),"Video Games");
    i.setSubInterest(new Interest("MMOs",0),"Video Games");
    i.setSubInterest(new Interest("Sandbox",0),"Video Games");
    i.setSubInterest(new Interest("Arcade",0),"Video Games");
    i.setSubInterest(new Interest("other",0),"Video Games");
    i.setInterest(new SuperInterest("Traditional games",0));
    i.setSubInterest(new Interest("Chess",0),"Traditional games");
    i.setSubInterest(new Interest("Other strategy games",0),"Traditional games");
    i.setSubInterest(new Interest("LARP",0),"Traditional games");
    i.setSubInterest(new Interest("TTRPG",0),"Traditional games");
    i.setSubInterest(new Interest("CCGs",0),"Traditional games");
    i.setSubInterest(new Interest("Card games",0),"Traditional games");
    i.setSubInterest(new Interest("other",0),"Traditional games");
    i.setInterest(new SuperInterest("Sport",0));
    i.setSubInterest(new Interest("Football",0),"Sport");
    i.setSubInterest(new Interest("Handball",0),"Sport");
    i.setSubInterest(new Interest("Hockey",0),"Sport");
    i.setSubInterest(new Interest("Golf",0),"Sport");
    i.setSubInterest(new Interest("Gymnastics",0),"Sport");
    i.setSubInterest(new Interest("other",0),"Sport");
    i.setInterest(new SuperInterest("Literature",0));
    i.setSubInterest(new Interest("Fantasy/Sci-Fi",0),"Literature");
    i.setSubInterest(new Interest("Romances",0),"Literature");
    i.setSubInterest(new Interest("Thrillers",0),"Literature");
    i.setSubInterest(new Interest("historical/Sociological",0),"Literature");
    i.setSubInterest(new Interest("Nonfiction",0),"Literature");
    i.setSubInterest(new Interest("other",0),"Literature");
    i.setInterest(new SuperInterest("Intellectual",0));
    i.setSubInterest(new Interest("IT",0),"Intellectual")
    i.setSubInterest(new Interest("Social science",0),"Intellectual")
    i.setSubInterest(new Interest("Natural science",0),"Intellectual")
    i.setSubInterest(new Interest("Theology",0),"Intellectual")
    i.setSubInterest(new Interest("Psychology",0),"Intellectual")
    i.setSubInterest(new Interest("Linguistics",0),"Intellectual")
    i.setSubInterest(new Interest("History",0),"Intellectual")
    i.setSubInterest(new Interest("other",0),"Intellectual")
    i.setInterest(new SuperInterest("Physical activities",0));
    i.setSubInterest(new Interest("Team sports", 0),"Physical activities");
    i.setSubInterest(new Interest("Running/Orientation", 0),"Physical activities");
    i.setSubInterest(new Interest("Gyms", 0),"Physical activities");
    i.setSubInterest(new Interest("Martial Arts", 0),"Physical activities");
    i.setSubInterest(new Interest("Other", 0),"Physical activities");
    i.setInterest(new SuperInterest("Tv shows",0));
    i.setSubInterest(new Interest("Reality",0),"Tv shows")
    i.setSubInterest(new Interest("Medical",0),"Tv shows")
    i.setSubInterest(new Interest("Documentaries",0),"Tv shows")
    i.setSubInterest(new Interest("Nonfiction",0),"Tv shows")
    i.setSubInterest(new Interest("Anime",0),"Tv shows")
    i.setSubInterest(new Interest("Animated",0),"Tv shows")

    return i;
}

export default { getInterests };
