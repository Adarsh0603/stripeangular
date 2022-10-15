import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Modules/guards/auth.guard';
import { MainGuard } from './Modules/guards/main.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    canActivate: [MainGuard],
    loadChildren: () =>
      import('./Modules/main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
