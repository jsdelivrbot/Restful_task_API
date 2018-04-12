import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
    this.getTaskById( '5ace78766294b517cb811934' );
    this.destroyTask( '5ace7db6778f281896a5cfc2' );
   }

   getTasks(){
     let tempObservable = this._http.get('/task');

     tempObservable.subscribe(data => console.log("Got our tasks!", data));
   }
   getTaskById(id){
    var route_call = "/task/" + id; 
    let tempObservable = this._http.get(route_call);

    tempObservable.subscribe(data => console.log("Got our task!", data));
  }
  destroyTask(id){
    var route_call = "/task/remove/" + id;
    let tempObservable = this._http.delete(route_call);

    tempObservable.subscribe(data => console.log("Task destroyed!", data));
  }

}
