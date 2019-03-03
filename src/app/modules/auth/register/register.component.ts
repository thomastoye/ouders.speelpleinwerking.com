import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ],
    });
  }

  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

}
