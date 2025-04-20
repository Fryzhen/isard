import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MemberByIdComponent} from './member-by-id/member-by-id.component';

const routes: Routes = [
  // {
  //   path: 'me',
  //   component: null
  // },
  {
    path: ':memberId',
    component: MemberByIdComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MemberByIdComponent
  ],
})
export class MemberModule {
}
