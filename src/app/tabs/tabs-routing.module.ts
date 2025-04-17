import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaprincipalPage } from '../paginaprincipal/paginaprincipal.page';

const routes: Routes = [
  {
    path: 'paginaprincipal',
    component: PaginaprincipalPage,
    children: [
      {
        path: 'paginaprincipal',
        loadComponent: () => import('../paginaprincipal/paginaprincipal.page').then(m => m.PaginaprincipalPage)
      },
      {
        path: '',
        redirectTo: '/paginaprincipal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/paginaprincipal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
