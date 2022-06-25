import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { PromotionsComponent } from './modules/promotions/promotions.component';

const routes: Routes = [
  { path: '', component: PromotionsComponent },
  {
    path: '',
    loadChildren: () =>
      import('./modules/promotions/promotions.module').then(
        (m) => m.PromotionsModule
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
