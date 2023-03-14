import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent {

  constructor(private formService: FormService, private router:Router, private _snackbar: MatSnackBar) { }

  responseEmail!: string;
  message!: string;
  responseSubject!: string;


  ngOnInit(): void {
    this.addInfromation();
  }

  addInfromation(){
    this.responseEmail = localStorage.getItem('email')!;
    this.responseSubject = localStorage.getItem('subject')!;

    const replyMessage = document.getElementById('responseEmail')!;
    replyMessage.innerHTML = "Replying to: " + this.responseEmail;
    
    const replySubjectMessage = document.getElementById('responseSubject')!;
    replySubjectMessage.innerHTML = "Subject: " + this.responseSubject;
  }


  submit(){

    if(this.message == undefined || this.message == ""){
      this._snackbar.open("Please enter a message", "Close", {
        duration: 2000,
      });
    }
    else{
      this.formService.replyMessage(this.responseEmail, this.responseSubject, this.message)

      localStorage.removeItem('email');
      localStorage.removeItem('subject');

      this.router.navigate(["/admin"]);
    }
  }

  cancel(){
    localStorage.removeItem('email');
    localStorage.removeItem('subject');

    this.router.navigate(["/admin"]);
  }

}
