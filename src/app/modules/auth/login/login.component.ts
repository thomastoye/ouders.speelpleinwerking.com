import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  error = '';

  private commonCodes = {
    'auth/user-not-found': 'Geen gebruiker met dit emailadres gevonden',
    'auth/wrong-password': 'Verkeerd wachtwoord'
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(res => {
        this.router.navigate(['/']);
      }, (err: { readonly message: string, readonly code: string }) => {
        console.error('Error while logging in', err);

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
