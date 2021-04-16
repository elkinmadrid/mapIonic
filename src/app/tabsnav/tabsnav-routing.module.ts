import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsnavComponent } from './tabsnav.component';

const routes: Routes = [
  {
    path: 'tab-nav',
    component: TabsnavComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsNavRoutingModule {}
