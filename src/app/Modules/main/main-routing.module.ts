import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailureComponent } from '../checkout/failure/failure.component';
import { SuccessComponent } from '../checkout/success/success.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../Modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('../../Modules/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      { path: 'success', component: SuccessComponent },
      { path: 'failure', component: FailureComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
