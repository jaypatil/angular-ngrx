import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CheckOut } from '../models/checkout';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styles: [
    `
    :host {
        font-family: Arial;
        font-size: 17px;
        padding: 8px;
      }
      
      * {
        box-sizing: border-box;
      }
      
      .row {
        display: -ms-flexbox; /* IE10 */
        display: flex;
        -ms-flex-wrap: wrap; /* IE10 */
        flex-wrap: wrap;
        margin: 0 -16px;
      }
      
      .col-25 {
        -ms-flex: 25%; /* IE10 */
        flex: 25%;
      }
      
      .col-50 {
        -ms-flex: 50%; /* IE10 */
        flex: 50%;
      }
      
      .col-75 {
        -ms-flex: 75%; /* IE10 */
        flex: 75%;
      }
      
      .col-25,
      .col-50,
      .col-75 {
        padding: 0 16px;
      }
      
      .container {
        background-color: #f2f2f2;
        padding: 5px 20px 15px 20px;
        border: 1px solid lightgrey;
        border-radius: 3px;
      }
      
      input[type=text] {
        width: 100%;
        margin-bottom: 20px;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      
      label {
        margin-bottom: 10px;
        display: block;
      }
      
      .icon-container {
        margin-bottom: 20px;
        padding: 7px 0;
        font-size: 24px;
      }
      
      .btn {
        background-color: #4CAF50;
        color: white;
        padding: 12px;
        margin: 10px 0;
        border: none;
        width: 100%;
        border-radius: 3px;
        cursor: pointer;
        font-size: 17px;
      }
      
      .btn:hover {
        background-color: #45a049;
      }
      
      a {
        color: #2196F3;
      }
      
      hr {
        border: 1px solid lightgrey;
      }
      
      span.price {
        float: right;
        color: grey;
      }
      
      /* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
      @media (max-width: 800px) {
        .row {
          flex-direction: column-reverse;
        }
        .col-25 {
          margin-bottom: 20px;
        }
      }
  `,
  ],
})
export class PaymentFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<CheckOut>();

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