import { getRtlScrollAxisType } from "@angular/cdk/platform";

export class Form{
    name!: string;
    email!: string;
    subject!: string;
    message!: string;
    
       constructor(
        name:String,
        email:String,
        subject:String,
        message:String
    ){}

    public setName(name: string){
    this.name = name;
}

public getName(): string{
    return this.name;
}

public setEmail(email: string){
    this.email = email;
}

public getEmail(): string{
    return this.email;
}

public setSubject(subject: string){
    this.subject = subject;
}   

public getSubject(): string{
    return this.subject;
}

public setMessage(message: string){
    this.message = message;
}

public getMessage(): string{
    return this.message;
}




}


