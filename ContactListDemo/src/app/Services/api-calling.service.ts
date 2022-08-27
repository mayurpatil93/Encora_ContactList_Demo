
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class ApiCallingService {
  baseUrl = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response';
  

    

  constructor(protected http: HttpClient) { }

  getHeaders() {
      const headers = new HttpHeaders()
      .set('X-Auth', 'authKey'); 
      return headers;         
  } 

}



@Injectable({
  providedIn: 'root'
})

export class PersonApi extends ApiCallingService{

  getAll() {
    const params = new HttpParams() 
        .set('page', '1') 
        .set('pageSize', '10');        
    return this.http.get<Person[]>(`${this.baseUrl}/contacts`, {params});           
}

create(contact: Person) {
  const headers = this.getHeaders();
  return this.http.post<Person>(`${this.baseUrl}/contacts`, contact, {headers});
}
}



