import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;

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

  onSignup() {
    if (!this.signupForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      this.signupForm.value.email,
      this.signupForm.value.password
    );
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.signupForm.get(controlName);
  }

  initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [
        AppValidators.required,
        AppValidators.email,
        AppValidators.cannotContainSpace
      ]),
      password: new FormControl(null, [
        AppValidators.required,
        AppValidators.minLength(6)
      ]),
      confirmPassword: new FormControl(null, [
        AppValidators.required,
        AppValidators.minLength(6),
        AppValidators.matchValues('password')
      ])
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
