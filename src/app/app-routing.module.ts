import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
   path: 'hoy',
   loadChildren: () => import('./hoy/hoy.module').then( m => m.HoyPageModule)
  },
  {
    path: 'programados',
    loadChildren: () => import('./programados/programados.module').then( m => m.ProgramadosPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'habitos',
    loadChildren: () => import('./habitos/habitos.module').then( m => m.HabitosPageModule)
  },
  {
    path: 'recordatorios',
    loadChildren: () => import('./recordatorios/recordatorios.module').then( m => m.RecordatoriosPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }