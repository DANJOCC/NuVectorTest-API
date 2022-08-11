export interface User{
    email:string,
    username:string,
    password:string
}

export interface Admin extends User{
}

export interface Contractor extends User{
    firts_name:string,
    last_name:string,
    gender:string,
    birthyear:string,
    country:string,
    active:boolean
}