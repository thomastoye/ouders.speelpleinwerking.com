import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ContactPerson, IChild, IContactPerson, ICrew, Crew, Child} from '@hoepel.app/types';
import {PersonFormComponent} from '../person-form/person-form.component';

@Component({
  selector: 'app-person-form-dialog',
  templateUrl: './person-form-dialog.component.html',
  styleUrls: ['./person-form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None, // needed for css (panelClass of dialog) - could also include this in a global scss file
})
export class PersonFormDialogComponent implements OnInit {
  @ViewChild(PersonFormComponent, { static: true }) form;

  person: IChild | ICrew | IContactPerson;
  type: 'child' | 'crew' | 'contact-person';
  action: 'edit' | 'new';

  // Only used when action === 'new' - dialog title
  newDialogTitle;

  valid$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<PersonFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      readonly person: IChild | ICrew | IContactPerson,
      readonly type: 'child' | 'crew' | 'contact-person',
      readonly action: 'edit' | 'new',
    },
  ) {
    this.person = data.person;
    this.type = data.type;
    this.action = data.action;

    if (this.action === 'new') {
      switch (this.type) {
        case 'contact-person':
          this.person = ContactPerson.empty();
          this.newDialogTitle = 'Nieuwe contactpersoon';
          break;
        case 'crew':
          this.person = Crew.empty();
          this.newDialogTitle = 'Nieuwe animator';
          break;
        case 'child':
          this.person = Child.empty();
          this.newDialogTitle = 'Nieuw kind';
          break;
        default:
          console.error('Unknown person type while creating a new person:', this.type);
      }
    }
  }

  ngOnInit(): void {

  }

  submit(person: IChild | ICrew | IContactPerson): void {
    this.dialogRef.close({
      action: this.action,
      person,
    });
  }

  doCancel(): void {
    this.dialogRef.close();
  }

  doSave(): void {
    this.submit(this.form.result);
  }
}
