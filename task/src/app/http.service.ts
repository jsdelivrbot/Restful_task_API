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
    var route_call = "/task/" + id; 
    return this._http.get(route_call);
  }
  destroyTask(id){
    var route_call = "/task/remove/" + id;
    let tempObservable = this._http.delete(route_call);

    tempObservable.subscribe(data => console.log("Task destroyed!", data));
  }

}
