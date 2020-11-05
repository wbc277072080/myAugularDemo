import { Component, OnInit } from '@angular/core';
import {DemoService} from '../server/demo.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {Demo} from '../model/demo';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  url:String;
  todos: Demo = {
    _id:"",
    title:"",
    description: "",
    duedate:new Date(),
    modifiedDate:"",
    isdone:false

  };

  constructor(private todoService : DemoService,private route: ActivatedRoute) { 
    
  }
  close(){
    window.location.href="";
  }

  ngOnInit(): void {
    this.route.url.subscribe(url=>{this.url=url[0].toString()});
    this.todoService.get(this.url).toPromise().then(todos =>{
      this.todos=todos;
    })
  }

}
