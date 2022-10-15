import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SuccessComponent } from '../checkout/success/success.component';
import { FailureComponent } from '../checkout/failure/failure.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,

    SuccessComponent,
    FailureComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
