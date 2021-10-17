import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  // private REST_API_SERVER = 'https://fastapiloan.azurewebsites.net/loan/';

  //private REST_API_SERVER = 'http://127.0.0.1:5000/loan/';
  private REST_API_SERVER = 'https://mymortgagecalcengine.azurewebsites.net/loan/';


  constructor(private httpClient: HttpClient) {
   }

  public loan(facevalue:number,n:number,r:string) {
    return this.httpClient.get(this.REST_API_SERVER +facevalue+  '/'+n+'/'+r);
  }

}

