import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../models/user';

@Component({
  selector: 'login-form',
  template: `
    <div>
      <div>Login</div>
      <div>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div>
            <div>
              <input type="text"  placeholder="Username" formControlName="username">
            </div>
          </div>

          <div>
            <div>
              <input type="password"  placeholder="Password" formControlName="password">
            </div>
          </div>

          <div *ngIf="errorMessage" class="loginError">
            {{ errorMessage }}
          </div>

          <div class="loginButtons">
            <button type="submit" button>Login</button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 72px 0;
    }

    .mat-form-field {
      width: 100%;
      min-width: 300px;
    }

    div,
    div {
      display: flex;
      justify-content: center;
    }

    .loginError {
      padding: 16px;
      width: 300px;
      color: white;
      background-color: red;
    }

    .loginButtons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `,
  ],
})
export class LoginFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
