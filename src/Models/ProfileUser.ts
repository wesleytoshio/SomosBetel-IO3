import { DateTime } from "ionic-angular";

export interface ProfileUser {
    
    $key: string;
    id: String;
    uid:string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    photoURL: string;
    birthDay: DateTime;
    whatsapp: string;
    city: string;
    State: string;
    memberSince: Date;
    functionType: string;

}