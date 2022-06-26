import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private unsubscribe$: Subject<null> = new Subject();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authStatus: boolean) => {
        this.isLoading = false;
      });
  }

  // ToDo: Maybe it would be better with reactive forms.
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
