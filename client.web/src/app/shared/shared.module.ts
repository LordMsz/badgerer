import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material.module';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { IfLoadingDirective } from './directives/if-loading.directive';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppHeaderComponent, IfLoadingDirective],
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule
  ],
  exports: [
    AppHeaderComponent,
    IfLoadingDirective
  ]
})
export class SharedModule { }
