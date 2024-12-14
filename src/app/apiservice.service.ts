import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoveChange } from 'ngx-chess-board';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService 
{
    
  private apiUrl = "https://9psme4ktze.execute-api.ap-south-1.amazonaws.com/userstage/user"

  constructor(private http: HttpClient) { }

  createItem(userId: any): Observable<any> 
  {  
    return this.http.post(this.apiUrl, userId) ;
  }

  getitem():Observable<any>
  {
    return this.http.get(`${this.apiUrl}`)
  }
  deleteitem(userId:any):Observable<any>
  {
    return this.http.delete( `${this.apiUrl}/${userId}` )
  }
  
  private errorsubject=new BehaviorSubject<string>('')
  error=this.errorsubject.asObservable()
  errorcall(error)
  {
    this.errorsubject.next(error)
  }


  
 //web socket service
 wsurl="wss://fth52n7v67.execute-api.ap-south-1.amazonaws.com/chess/"
 private ws:WebSocket;
 private move=new Subject<any>;
 connect()
 {
   this.ws=new WebSocket(this.wsurl)
   this.ws.onmessage=(event)=>{
     this.move.next(event.data)
   }
 }

 sendmove(move)
 {
   this.ws.send(JSON.stringify(move))
 }

 getmove():Observable < MoveChange['move'] >
 {
   return this.move.asObservable()
 }
}
