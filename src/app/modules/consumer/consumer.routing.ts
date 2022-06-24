import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { ConsumerCreateComponent } from './consumer-create/consumer-create.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumerListComponent,
    children: [
      {
        path: 'create',
        component: ConsumerCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:consumerId',
        component: ConsumerCreateComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule {}
