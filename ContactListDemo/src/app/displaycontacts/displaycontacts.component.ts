
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../model/person';

@Component({
  selector: 'app-displaycontacts',
  templateUrl: './displaycontacts.component.html',
  styleUrls: ['./displaycontacts.component.css']
})
export class DisplaycontactsComponent implements OnInit {
  
    @Input()
    contacts!: Array<Person>;   
     
    editing: number | null = null;

    cachedContact = {} as Person | null;

    constructor() { }

    ngOnInit(): void {
    }

    getRow(id: number) {
        return {
            'editing': this.isEditing(id)
        };
    }

    isEditing(id: number) {
        return this.editing === id;
    }

    onCancelEdit(contact: any) {
        Object.assign(contact, this.cachedContact);
        this.cachedContact = null;
        this.editing = null;
    }

    onEdit(person: any) {
        if (this.editing != null && this.editing != person.id) {
            let prevEmp = this.contacts.find((x) => x.id == this.editing);
            if (prevEmp != null) {
                this.onCancelEdit(prevEmp);
            }
        }
        this.cachedContact = Object.assign({}, person);
        this.editing = person.id;
    }

    onEditContact(contact: any) {  
      let index = this.contacts.findIndex((x) => x.id == contact.id);  
        if(index != undefined){
          alert(`Record updated!`); 
        }
            
    }

    onDeleteContact(contact: any) {
      debugger
        if (!confirm(`Are you sure you want to delete ${contact.firstName}?`)) {
            return;
        }
       
        let index = this.contacts.findIndex((x) => x.id == contact.id);
        this.contacts.splice(index, 1); 
    }    

}

