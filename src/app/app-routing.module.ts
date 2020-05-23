import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationManagementComponent } from './location-management/location-management.component';

const routes: Routes = [{ path: '', component:LocationManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
