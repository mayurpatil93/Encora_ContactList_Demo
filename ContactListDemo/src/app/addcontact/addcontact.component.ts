

import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { Person } from '../model/person';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {


    contact = {} as Person;

    submitting = false;
    error = false;
    success = false;

    @Output('addContact')
    addContactEmitter = new EventEmitter();

    @ViewChild("contactName")
    contactNameRef!: ElementRef;

    constructor() { }

    ngOnInit(): void {
    }

    onAddContact() {
      debugger
        this.submitting = true
        this.clearStatus()
    
        if (this.invalidName() || this.invalidLastname() || this.invalidNumber()) {
            this.error = true
            return
        }
        
        this.addContactEmitter.emit(this.contact);
        this.contactNameRef.nativeElement.focus();

        this.contact = {} as Person;

        this.error = false;
        this.success = true;
        this.submitting = false;   
        
        setTimeout(() => {
            this.clearStatus();
        }, 3000);
    }

    clearStatus() {
        this.success = false;
        this.error = false;
    }    

    invalidName() {
        return !this.contact.firstName || this.contact.firstName.length == 0;
    }

    invalidLastname() {
        return !this.contact.lastName || this.contact.lastName.length == 0;
    }  

    invalidNumber(){
      return !this.contact.phone || this.contact.phone.length == 0 || this.contact.phone.length != 10;
    }
}
