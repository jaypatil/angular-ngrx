import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { PipesModule } from '../../shared/pipes';

import { PaymentFormComponent } from './payment-form.component';
import { OrderSummaryComponent } from './order-summary.component';
import { AddressPageComponent } from './address-form.component';

export const COMPONENTS = [
  PaymentFormComponent,
  OrderSummaryComponent,
  AddressPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule { }
