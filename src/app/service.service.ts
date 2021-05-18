import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {}

  readonly baseURL = 'https://prize.azurewebsites.net/api/EmployeeDetails'

  postEmployeeDetail(value: any) {
    return this.http.post(this.baseURL,value);
  }
  putEmployeeDetail(id: any,value: any) {
    return this.http.put(`${this.baseURL}/${id}`, value);
  }

  onReceive(){
    return this.http.get(this.baseURL);
  }



  deletePaymentDetail(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
