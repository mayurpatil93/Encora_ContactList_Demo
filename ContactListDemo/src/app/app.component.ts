import { Component } from '@angular/core';
import { Person } from './model/person';
import { PersonApi } from './Services/api-calling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contacts: Array<Person> = [];
  title ="Contact List"
  contactsLoaded = false;
  baseUrl: string;

  constructor(private contactsApi: PersonApi) { 
      this.baseUrl = location.href;
  }
 
  ngOnInit() {
    debugger
      this.contactsApi.getAll().subscribe({
          next: (data) => {
              this.contacts = data;         
          },
          error: (error) => {
              console.log(error);
              alert(`Error Occurred: Unable to fetch data from api. Please try again!`); 
          },
      }).add(() => {
          this.contactsLoaded = true           
      });        
  }
  
  onAddContact(contact: Person) {
    this.contactsApi.create(contact).subscribe({
        next: (data: Person) => {
debugger
            let maxId = this.contacts.length > 0 ? 
                this.contacts.reduce((a,b)=>a.id > b.id ? a : b).id
                : 0;
            let nextId = maxId + 1;
            data.id = Math.max(nextId, data.id);
            this.contacts.push(data)
        },
        error: (error) => {
            console.log(error);
            alert(`Error Occurred: Unable to create contact on the api. Please try again!`); 
        }
    });
}  
}
