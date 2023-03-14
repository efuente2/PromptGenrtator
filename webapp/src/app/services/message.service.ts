import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meassage } from '../models/messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) {}

  getMessages(): Observable<Array<Meassage>>{
    return this.http.get<Array<Meassage>>('http://localhost:9090/contact');
  }

  deleteMessage(id: number): Observable<any>{
    return this.http.delete(`http://localhost:9090/contact/${id}`);
  }
}
