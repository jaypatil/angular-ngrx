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
        <div class="imgcontainer">
          <img src="assets/image/img_avatar.png" alt="Avatar" class="avatar">
        </div>
        <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname"  formControlName="username">
    
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" formControlName="password">
        <div *ngIf="errorMessage" class="loginError">
        {{ errorMessage }}
      </div>
        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label>
      </div>
    
      <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
        

        </form>
      </div>
    </div>
  `,
  styles: [
    `
    :host {font-family: Arial, Helvetica, sans-serif;}
    form {border: 3px solid #f1f1f1;}

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        opacity: 0.8;
    }

    .cancelbtn {
        width: auto;
        padding: 10px 18px;
        background-color: #f44336;
    }

    .imgcontainer {
        text-align: center;
        margin: 24px 0 12px 0;
    }

    img.avatar {
        width: 40%;
        border-radius: 50%;
    }

    .container {
        padding: 16px;
    }

    span.psw {
        float: right;
        padding-top: 16px;
    }
    .loginError {
      color: red;
    }
    /* Change styles for span and cancel button on extra small screens */
    @media screen and (max-width: 300px) {
        span.psw {
          display: block;
          float: none;
        }
        .cancelbtn {
          width: 100%;
        }
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

  constructor() { }

  ngOnInit() { }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
