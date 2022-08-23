export interface User{
    email:string,
    username:string,
    password:string
    active:boolean
}

export interface Admin extends User{
    projects:Array<string | Object>,
}

export interface Contractor extends User{
    code:String,
    first_name:string,
    last_name:string,
    gender:string,
    birthyear:string,
    country:string,
}