import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form } from '../contact/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient, private _snackbar: MatSnackBar) { }

  public submitForm(name: string, email: string, subject: string, message: string){

    const contactForm: Form = new Form(
      name,
      email,
      subject,
      message
    );

    contactForm.setName(name);
    contactForm.setEmail(email);
    contactForm.setSubject(subject);
    contactForm.setMessage(message);
  
    console.log(contactForm.name);
    
    this.http.post("http://localhost:9090/contact", contactForm, {responseType: 'text' as 'json'})
    .subscribe(
      data => {
        console.log("POST Request is successful ", data);
        this._snackbar.open('Thank you for your question will get back to you as soon as possible', 'Close', { duration: 3000 }); 
      }
    );

  }

  public replyMessage( to: String, subject: String, content: string){
    this.http.post("http://localhost:9090/email", { to, subject, content}, {responseType: 'text' as 'json'})
    .subscribe(
      data => {
        console.log("POST Request is successful ", data);
        this._snackbar.open('Message sent', 'Close', { duration: 3000 }); 
      }
    );
  }
}
