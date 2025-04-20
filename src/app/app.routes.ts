import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: 'lookup',
    loadChildren: () => import('./module/lookup/lookup.module').then(m => m.LookupModule),
  },
  {
    path: 'member',
    loadChildren: () => import('./module/member/member.module').then(m => m.MemberModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
