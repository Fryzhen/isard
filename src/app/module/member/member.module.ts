import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from './member.component';
import {MemberResearchComponent} from './member-research/member-research.component';

const routes: Routes = [
  {
    path: '',
    component: MemberResearchComponent,
  },
  {
    path: ':memberId',
    component: MemberComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class MemberModule {
}
