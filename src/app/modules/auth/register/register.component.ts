import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = '';

  private commonCodes = {
    'auth/email-already-in-use': 'Dit emailadres is al in gebruik. Log in of reset je wachwoord.',
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ],
    });
  }

  submit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value.email, this.registerForm.value.password).then(credential => {
        this.router.navigate(['/']);
      }).catch(err => {
        console.error('Error while registering user', err);

        if (this.commonCodes[err.code]) {
          this.error = this.commonCodes[err.code];
        } else {
          console.error('Unknown error while logging in: ', err.code);
          this.error = 'Onbekende fout: ' + err.message;
        }
      });
    }
  }

}
