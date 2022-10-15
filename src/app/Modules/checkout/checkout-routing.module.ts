import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { FailureComponent } from './failure/failure.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: ':id', component: CheckoutComponent },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'failure',
    component: FailureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
