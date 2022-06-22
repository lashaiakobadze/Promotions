import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerListComponent } from './posts/post-list/post-list.component';
import { ConsumerCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: ConsumerListComponent },
  {
    path: 'create',
    component: ConsumerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:postId',
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
