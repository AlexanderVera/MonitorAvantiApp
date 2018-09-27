import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { TnVariable } from "./models/tnVariable";

@Injectable()
export class Global {
  params: Map<string,any>;
}


@Injectable()
export class DataService {

  httpOptions: any;
  

  dataTnVariableUrl =  '/tnVariable/getDataTnVariable';
  deleteTnVariableUrl =  '/tnVariable/deleteTnVariable/'; 
  saveTnVariableUrl =  '/tnVariable/saveTnVariable';
  updateTnVariableUrl =  '/tnVariable/updateTnVariable/'; 

  endpoint = 'http://104.198.179.226:8090/monitoreo-1.0.0/rest/controllers';

  constructor(private global : Global, private http: Http) {
    this.global.params = new Map();
   }


   addTokenHeader(token:string){

    this.httpOptions = {
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };
  }

  addHeaderWithOutToken(){
    this.httpOptions = {
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
  }

  setParam(key:string, value){
    this.global.params.set(key,value);
  }

  getParam(key:string){
    return this.global.params.get(key);
  }

  getDataTnVariable(token:string): Observable<any> {

    const url =  this.endpoint+this.dataTnVariableUrl;
    //this.addTokenHeader(token);
    this.addHeaderWithOutToken();
    console.log("getDataTnVariable service: {"+url+"}");

    return this.http.get(url, this.httpOptions).catch((e: Response) =>{
      console.error('getDataTnVariable:');
      console.error(JSON.stringify(e));
      return Observable.throw(this.handleError(e))
      }
    );

  }

  deleteDataTnVariable(token:string, idVariable: number): Observable<any> {

    const url =  this.endpoint+this.deleteTnVariableUrl+idVariable;
    //this.addTokenHeader(token);
    this.addHeaderWithOutToken();
    console.log("deleteDataTnVariable service: {"+url+"}");

    return this.http.delete(url, this.httpOptions).catch((e: Response) =>{
      console.error('deleteDataTnVariable:');
      console.error(JSON.stringify(e));
      return Observable.throw(this.handleError(e))
      }
    );

  }



    saveVariable(token:string, requestVar:TnVariable): Observable<any> {

      const url =  this.endpoint+this.saveTnVariableUrl;
      this.addTokenHeader(token);
      console.log("saveVariable-service: {"+url+"}");
      console.log(JSON.stringify(requestVar));
      return this.http
      .post(url, requestVar, this.httpOptions).catch((e: Response) =>{
        console.error('Error saveVariable:');
        console.error(JSON.stringify(e));
        console.error('Error requestVar:');
        console.error(JSON.stringify(requestVar));
        return Observable.throw(this.handleError(e))
        }
      );
  
      //const url =  this.endpoint+this.consultarCuentasUrl;
    }

    updateVariable(token:string, requestVar:TnVariable): Observable<any> {

      const url =  this.endpoint+this.updateTnVariableUrl;
      this.addTokenHeader(token);
      console.log("updateVariable-service: {"+url+"}");
      console.log(JSON.stringify(requestVar));
      return this.http
      .put(url, requestVar, this.httpOptions).catch((e: Response) =>{
        console.error('Error updateVariable:');
        console.error(JSON.stringify(e));
        console.error('Error requestVar:');
        console.error(JSON.stringify(requestVar));
        return Observable.throw(this.handleError(e))
        }
      );
  
      //const url =  this.endpoint+this.consultarCuentasUrl;
    }


    //const url =  this.endpoint+this.consultarCuentasUrl;

    
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError(operation: Response, result?) {
    console.log(operation.json.toString);
    return (error: any) => {
      // TODO: send the error to remote logging infrastructure
      console.log('ERROR');
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return result;
    };
  }

}


