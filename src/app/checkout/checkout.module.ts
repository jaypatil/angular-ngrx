import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';

import { PaymentPageComponent } from './containers/payment-page.component';
import { CheckOutComponent } from './containers/checkout.component';
import { AddressPageComponent } from './containers/address-page.component';
import { CheckOutRoutingModule } from './checkout-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CheckOutRoutingModule
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    // StoreModule.forFeature('books', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    // EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ],
  declarations: [
    CheckOutComponent,
    PaymentPageComponent,
    AddressPageComponent
  ],
  providers: [],
})
export class CheckOutModule { }
