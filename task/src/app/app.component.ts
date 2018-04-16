import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restful Task API with Angular!';
  tasks = [];
  task = [];
  newTask: any;
  task_id: any;

  constructor(private _httpService: HttpService){
  }

  ngOnInit(){
    this.newTask = {title: "", description: ""};
    this.getTasksFromService();
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks()
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.tasks = data['data'];
    });
  }
  onButtonClick(): void { 
    this.getTasksFromService();
  }
  onButtonClickParam(): void { 
    let observable = this._httpService.getTaskById(this.task_id);
    observable.subscribe(data => {
      console.log("Got our task!", data);
      this.task = data['data'];
    });
  };
  onSubmit(){
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("Got our post back!", data);
      this.newTask = {title: "", description: ""};
    });
    this.getTasksFromService();
  };
  onClickEdit(task_id){
    this.task_id = task_id;
    this.onButtonClickParam();
  };
  onClickUpdate(){
    let observable = this._httpService.updateTask(this.task);
    observable.subscribe(data => {
      console.log("Got our post back!", data);
      this.task = [];
    });
    this.getTasksFromService();
  };
  onClickDestroy(task_id){
    let observable = this._httpService.destroyTask(task_id);
    observable.subscribe(data => {
      console.log("Got our delete back!", data);
      this.task = [];
    });
    this.getTasksFromService();
  };
}
