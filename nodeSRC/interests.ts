//names: are bound to a boolean indicating an attitude
//attitudes: false indicates dislike while true indicates likes
class Interests 
{
    private interests: Map<string,boolean>;
    
    public addInterest(name: string, attitude: boolean)
    {
        this.interests.set(name,attitude);
    }

    public removeInterest(name: string)
    {
        this.interests.delete(name);
    }

    public setAttitude(name: string, attitude: boolean)
    {
        this.interests.set(name,attitude);
    }

    public getList()
    {
        let names:  Array<string>  = Array.from(this.interests.keys());
        let values: Array<boolean> = Array.from(this.interests.values());
        //zips interests together with attitude
        return names.map(function(e,i) {return [e,values[i]]})
    }

    
    
}

