import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private unsubscribe$: Subject<null> = new Subject();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.initForm();

    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authStatus: boolean) => {
        this.isLoading = false;
      });
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.loginForm.get(controlName);
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        AppValidators.required,
        AppValidators.email,
        AppValidators.cannotContainSpace
      ]),
      password: new FormControl(null, [
        AppValidators.required,
        AppValidators.minLength(6)
      ])
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
