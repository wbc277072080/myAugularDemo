import { Component, OnInit } from '@angular/core';
import {DemoService} from '../server/demo.service';
import {Demo} from '../model/demo';
import {DetailsComponent} from '../details/details.component';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  demos: Array<Demo>;
  //add demo info
  title: String;
  description : String;
  duedate: String;

  constructor(private demoService: DemoService) {
    this.demoService.getTodo().subscribe(demos=>{
      console.log(demos);
      this.demos=demos;
    });
   }

   addDemo(){
    var newDemo={
      title:this.title,
      description: this.description,
      duedate:this.duedate,
      modifiedDate:new Date(),
      isdone:false
    }
    //this.todos.push(newTodo);
    this.demoService.addTodo(newDemo)
      .subscribe(todo => {
        this.demoService.getTodo().subscribe(demos =>{
          console.log(demos);
          this.demos = demos;
          location.reload();
        });
        this.title='';
        this.description='';
        this.duedate='';
        
      })
   }

   deleteDemo(demo){
      var demos=this.demos;
      this.demoService.deleteTodo(demo.id).subscribe(data =>{
        for(var i = 0;i<demos.length;i++){
          if(demos[i]._id == demo.id){
            demos.splice(i,1);
            window.location.href="";
            
          }
        }
    })
   }

   updateStatus(todo){
    var _todo = {
      _id:todo._id,
      title:todo.title,
      description:todo.description,
      duedate:todo.duedate,
      modifiedDate:new Date(),
      isdone:!todo.isdone
    };
    this.demoService.updateStatus(_todo)
    .subscribe(data =>{
      todo.isdone = !todo.isdone;
      //this.detailsComponent.ngOnInit();
      location.reload();
    });
  }

  updateDemo(todo){
    var demos = this.demos;
    console.log(this.title);
    if(this.title=='' || this.title==undefined){
      alert("title is empty!");
      return;
    }
    if(this.description=='' ||this.description==undefined){
      alert("description is empty!");
      return;
    }
    if(this.duedate=='' || this.duedate==undefined){
      alert('due date is empty!');
      return;
    }

    var _todo={
      _id:todo._id,
      title:this.title,
      description: this.description,
      duedate:this.duedate,
      modifiedDate:new Date(),
      isdone:todo.isdone
    }

    this.demoService.updateTodo(_todo)
    .subscribe(data =>{
      // todo.title = this.title;
      // todo.description = this.description;
      // todo.duedate = this.duedate;
      // todo.modifiedDate=new Date();
      this.demoService.getTodo().subscribe(demos =>{
        console.log(demos);
        this.demos = demos;
        location.reload();
      });
    });


  }

  ngOnInit(): void {
  }

}
