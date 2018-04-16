import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  }

  getTasks(){
    return this._http.get('/task');
  }
  getTaskById(id){
    console.log(id);
    var route_call = "/task/" + id; 
    return this._http.get(route_call);
  }
  addTask(newTask){
    console.log(newTask);
    return this._http.post('/task/new', newTask);
  };
  updateTask(editTask){
    console.log("updateTask:", editTask)
    return this._http.put('/task/update', editTask);
  };
  destroyTask(id){
    console.log('destroyTask:', id)
    var route_call = "/task/remove/" + id;
    return this._http.delete(route_call);
  }
}
