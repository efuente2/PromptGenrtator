import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meassage } from 'src/app/models/messages.model';
import { FormService } from '../services/form.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  name!: string;
  price!: number;
  description!: string;
  category!: string;
  image!: File;

  replyMessage!: string;

  messages: Array<Meassage> | undefined;
  messageSubscriptions: Subscription | undefined;

  constructor(private messageService: MessageService, private router:Router, private formService: FormService) { }

  ngOnInit(): void {
    this.getallmessages();
    this.showReply(0);
  }

  getallmessages() {
    this.messageSubscriptions = this.messageService.getMessages()
      .subscribe((_messages) => {
        this.messages = _messages;
      });
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(
      (data) =>{
        console.log(data);
        this.getallmessages();
      }
    );
     window.location.reload();
  }

  fileChange(event: any) {
    this.image = event.target.files[0];
  }


  logout(){
    localStorage.removeItem('Admin');
    this.router.navigate(["/login"]);
  }


  submit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('description', this.description);
    formData.append('category', this.category);
    formData.append('image', this.image);
  }

  showReply(id: number) {
    if (id == 1) {
      document.getElementById('reply')?.setAttribute('style', 'display:block');
    }
    else {
      document.getElementById('reply')?.setAttribute('style', 'display:none');
    }
  } 

  reply(email: String, subject: String) {
    localStorage.setItem('email', email.toString());
    localStorage.setItem('subject', subject.toString());
    this.router.navigate(["/replyForm"]);
  }




}
