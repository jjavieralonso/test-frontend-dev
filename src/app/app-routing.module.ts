import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentMethodsComponent } from './components/list-payment-methods/list-payment-methods.component';

const routes: Routes = [
  { path: 'paymentmethods', component: ListPaymentMethodsComponent},
  { path: '**', redirectTo: '/paymentmethods' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
