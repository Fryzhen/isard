import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LookupDriverComponent} from './lookup-driver/lookup-driver.component';

const routes: Routes = [
  {path: 'driver', component: LookupDriverComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LookupDriverComponent,
  ],
})
export class LookupModule {
}
