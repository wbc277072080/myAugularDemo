import {Injectable} from "@angular/core";
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { HAMMER_LOADER, ɵHAMMER_PROVIDERS__POST_R3__ } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {Demo} from '../model/demo';


@Injectable()
export class DemoService{
    constructor(private http:HttpClient){
        console.log("todo service init...")
    }
    getTodo(): Observable<Array<Demo>>{
        return this.http.get<Demo[]>("http://localhost:3000/demos");
    }
    get(id:String):Observable<Demo> {
        let todo$ = this.http.get<Demo>('http://localhost:3000/demos/'+id);
        return todo$;
      }
    addTodo(newTodo):Observable<Array<Demo>>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.post<Demo[]>("http://localhost:3000/demos",
         JSON.stringify(newTodo),
         httpOptions);
        //  .subscribe((response)=>{
        //      console.log(response);
        //      alert("add successfully")
        //  });
    }

    deleteTodo(id:String){
        return this.http.delete('http://localhost:3000/demos/'+id);
    }

    updateStatus(todo){
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.put('http://localhost:3000/demos/'+todo._id,
        JSON.stringify(todo),
        httpOptions
        );
    }

    updateTodo(todo){
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.put('http://localhost:3000/demos/'+todo._id,
        JSON.stringify(todo),
        httpOptions
        );
    }
}