import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { BasicPromotionsComponent } from './modules/basic-promotions/basic-promotions.component';

const routes: Routes = [
  { path: '', component: BasicPromotionsComponent },
  {
    path: '',
    loadChildren: () =>
      import('./modules/basic-promotions/basic-promotions.module').then(
        (m) => m.BasicPromotionsModule
      )
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'consumer',
    loadChildren: () =>
      import('./modules/consumer/consumer.module').then((m) => m.ConsumerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
