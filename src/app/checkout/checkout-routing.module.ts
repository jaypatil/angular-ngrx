import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './containers/checkout.component';
import { AddressPageComponent } from './containers/address-page.component';
import { PaymentPageComponent } from './containers/payment-page.component';

const routes: Routes = [
    {
        path: '', component: CheckOutComponent,
        children: [
            { path: 'payment', component: PaymentPageComponent },
            { path: '', component: AddressPageComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
            routes,
        )
    ],
    exports: [
        RouterModule
    ]
})
export class CheckOutRoutingModule { }
