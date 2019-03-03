import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  sent = ''; // email address to which a reset was sent
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
    });
  }

  submit() {
    if (this.forgotPasswordForm.valid) {
      this.auth.sendPasswordReset(this.forgotPasswordForm.value.email).then(_ => {
        this.sent = this.forgotPasswordForm.value.email;
        console.log(this.forgotPasswordForm.value.email);
        this.error = '';
      }, (err: { readonly code: string, readonly message: string }) => {
        this.sent = '';
        if (err.code === 'auth/user-not-found') {
          this.error = 'Geen gebruiker met dit emailadres gevonden';
        } else {
          this.error = 'Onbekende fout: ' + err.message;
          console.error('Unknown error while sending password reset', err.code);
        }
      });
    }
  }
}
