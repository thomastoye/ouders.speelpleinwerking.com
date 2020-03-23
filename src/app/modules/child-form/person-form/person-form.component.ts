import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactPerson, IChild, IContactPerson, ICrew, IPhoneContact, Child, Crew} from '@hoepel.app/types';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() person: IChild | ICrew | IContactPerson;
  @Input() type: 'child' | 'crew' | 'contact-person';


  /**
   * Will fire an event when the form is submitted, but only when it's valid.
   * Contents: a person object, representing the input with the form modifications
   */
  @Output() formSubmit = new EventEmitter<Child | Crew | ContactPerson>();

  /**
   * Will fire an event when the form is changed, but only when it's valid.
   * Contents: a person object, representing the input with the form modifications
   */
  @Output() valueChanged = new EventEmitter<Child | Crew | ContactPerson>();

  /** Will fire an event when the form is changed. Contents: boolean: whether the form is valid */
  @Output() isValid = new EventEmitter<boolean>();

  /** Will fire an event when the form is changed. Contents: whether the form is dirty */
  @Output() isDirty = new EventEmitter<boolean>();

  form: FormGroup;

  private destroy$ = new Subject<boolean>();

  // Configures what extra fields should be shown for each type of person
  private showFieldsConfig = {
    child: {
      address: true,
      birthDate: true,
      remarks: true,
      bankAccount: false,
      yearStarted: false,
      active: false,
      gender: true,
      phone: true,
      email: false,
      contactPeople: true,
    },
    crew: {
      address: true,
      birthDate: true,
      remarks: true,
      bankAccount: true,
      yearStarted: true,
      active: true,
      gender: false,
      phone: true,
      email: true,
      contactPeople: false,
    },
    'contact-person': {
      address: true,
      birthDate: false,
      remarks: true,
      bankAccount: false,
      yearStarted: false,
      active: false,
      gender: false,
      phone: true,
      email: true,
      contactPeople: false,
    }
  };

  constructor(
    private fb: FormBuilder,
  ) { }

  /**
   * Submit hook (e.g. when pressing enter in form)
   */
  onFormSubmit(): void {
    if (this.valid) {
      this.formSubmit.next(this.result!);
    }
  }

  /**
   * Conditionally show/hide fields based on person type
   */
  showField(fieldName: 'address' | 'birthDate' | 'remarks' | 'bankAccount' | 'yearStarted' | 'active' | 'gender' | 'phone' |
    'email'): boolean {
    // This could be expanded to let tenants configure what fields they want to show
    return this.showFieldsConfig[this.type || 'child'][fieldName];
  }

  // Lifecycle methods

  ngOnInit(): void {
    this.createForm();
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isValid.next(this.valid);
      this.isDirty.next(this.dirty);

      if (this.valid && this.result != null) {
        this.valueChanged.next(this.result);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();

    if (this.person) {
      // Patch form: set values of given person
      // if birth date does not exist, use empty object
      this.form.patchValue({
        ...this.person,
        birthDate: (this.person as any).birthDate || {},
        phone: this.person.phone.map(phone => this.fb.group({ phoneNumber: phone.phoneNumber, comment: phone.comment })),
      });

      this.setPhoneNumbers(this.person.phone);
      this.setEmailAddresses(this.person.email);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  // Getters

  get result(): Crew | Child | ContactPerson | null {
    if (!this.valid) {
      return null;
    }

    const formBirthDate = this.form.getRawValue().birthDate;
    const birthDate = (formBirthDate && formBirthDate.day && formBirthDate.month && formBirthDate.year) ? formBirthDate : null;

    const formValue = { ...this.form.getRawValue(), birthDate };

    switch (this.type) {
      case 'child':
        return new Child({ ...this.person, ...formValue });
      case 'contact-person':
        return new ContactPerson({ ...this.person, ...formValue });
      case 'crew':
        return new Crew({ ...this.person, ...formValue });
      default:
        console.error('Unknown person type in person form', this.type);
        return null;
    }
  }

  get dirty(): boolean {
    return this.form.dirty;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  // Phone and email array helpers

  get phoneFormArray(): FormArray {
    return this.form.get('phone') as FormArray;
  }

  get emailFormArray(): FormArray {
    return this.form.get('email') as FormArray;
  }

  deletePhoneNumber(index: number): void {
    this.phoneFormArray.removeAt(index);
  }

  deleteEmail(index: number): void {
    this.emailFormArray.removeAt(index);
  }

  addPhoneNumber(): void {
    this.phoneFormArray.push(this.fb.group({ phoneNumber: undefined, comment: undefined }));
  }

  addEmail(): void {
    this.emailFormArray.push(this.fb.control(undefined));
  }

  private setPhoneNumbers(numbers: ReadonlyArray<IPhoneContact>): void {
    this.form.setControl('phone', this.fb.array(numbers.map(phoneContact =>
      this.fb.group({
        phoneNumber: phoneContact.phoneNumber,
        comment: phoneContact.comment,
      })
    )));
  }

  private setEmailAddresses(addresses: ReadonlyArray<string>): void {
    this.form.setControl('email', this.fb.array(addresses.map(email => this.fb.control(email))));
  }

  /**
   * Create the form if it has not been created already
   */
  private createForm(): void {
    if (this.form) {
      // already created
      return;
    }

    this.form = this.fb.group({
      firstName: [undefined, Validators.required],
      lastName: [undefined, Validators.required],

      address: this.fb.group({
        street: undefined,
        number: undefined,
        zipCode: undefined,
        city: undefined
      }),

      phone: this.fb.array([]),
      email: this.fb.array([]),

      remarks: '',

      yearStarted: undefined,
      bankAccount: undefined,
      active: undefined,
      birthDate: this.fb.group({
        day: undefined,
        month: undefined,
        year: undefined,
      }),
      gender: undefined,
    });
  }
}
