import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { ConsumerCreateComponent } from './modules/consumer/consumer-create/consumer-create.component';
import { ConsumerListComponent } from './modules/consumer/consumer-list/consumer-list.component';

const routes: Routes = [
  // { path: '', component: PromotionsComponent },
  { path: 'consumer', component: ConsumerListComponent },
  {
    path: 'consumer/create',
    component: ConsumerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumer/edit/:consumerId',
    component: ConsumerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
