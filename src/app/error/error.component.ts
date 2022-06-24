import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Subscription } from "rxjs";

// import { ErrorService } from "./error.service";

@Component({
  templateUrl: './error.component.html',
  selector: 'app-error'
  // styleUrls: ["./error.component.scss"]
})
export class ErrorComponent {
  // data: { message: string };
  // private errorSub: Subscription;
  /**
   * Dynamic dialog,
   * Commented code is used for static dialog.
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
  // constructor(private errorService: ErrorService) {}

  // ngOnInit() {
  //   this.errorSub = this.errorService.getErrorListener().subscribe(message => {
  //     this.data = { message: message };
  //   });
  // }

  // onHandleError() {
  //   this.errorService.handleError();
  // }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
