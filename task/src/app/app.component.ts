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
  onButtonClickParam(id: String): void { 
    console.log(id);
    var task_id = id;
    console.log("id in app.component.ts:", task_id);
    let observable = this._httpService.getTaskById(task_id);
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
  };
}
