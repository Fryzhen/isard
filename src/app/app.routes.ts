import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './module/home/home.component';
import {AboutComponent} from './module/about/about.component';

export const routes: Routes = [
  {
    path: 'member',
    loadChildren: () => import('./module/member/member.module').then(m => m.MemberModule),
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
