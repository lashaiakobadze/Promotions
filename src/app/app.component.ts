import { Component, OnInit } from '@angular/core';
// import { Subscription } from "rxjs";

import { AuthService } from './auth/auth.service';
import { CoreConfig } from './core/config';
// import { ErrorService } from "./error/error.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // hasError = false;
  // private errorSub: Subscription;

  constructor(
    private authService: AuthService,
    private coreConfig: CoreConfig // private errorService: ErrorService
  ) {}

  config = this.coreConfig.select((r) => r.environment);

  ngOnInit() {
    this.authService.autoAuthUser();
    // this.errorSub = this.errorService.getErrorListener().subscribe(
    //   message => this.hasError = message !== null
    // );

    console.log('this.config', this.config);
  }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
