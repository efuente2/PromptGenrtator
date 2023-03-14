import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
name!: string;
  email!: string;
  subject!: string;
  message!: string;

  constructor(private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit(){

    if(this.name==undefined || this.email==undefined || this.subject==undefined || this.message==undefined){
      this._snackbar.open("Please fill in all the fields", "Close", {
        duration: 2000,
      });
    }
    else{
    //this.formService.submitForm(this.name, this.email, this.subject, this.message);
    }

  }
}
