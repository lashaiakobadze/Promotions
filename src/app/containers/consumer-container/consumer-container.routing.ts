import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { ConsumerCreateComponent } from 'src/app/modules/consumer/consumer-create/consumer-create.component';
import { ConsumerContainerComponent } from './consumer-container.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumerContainerComponent,
    children: [
      {
        path: 'create',
        component: ConsumerContainerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:consumerId',
        component: ConsumerCreateComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
  // {
  //   path: '/create',
  //   component: ConsumerCreateComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: '/edit/:consumerId',
  //   component: ConsumerCreateComponent,
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerContainerRoutingModule {}
