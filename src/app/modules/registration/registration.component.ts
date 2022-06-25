import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AppValidators } from 'src/app/shared/validators/app-validators';
import { Consumer } from 'src/app/models/consumer.model';
import { ImageSnippet } from 'src/app/models/image-snippet.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  @Input() BASE_URL;

  userId: string;
  profilesEmail: string;
  registrationForm: Consumer;
  validRegistration = false;
  curRegister: Consumer = null;

  authSub: Subscription;
  registrationSub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  onUpdate(): void {
    // this.registrationForm = new Registration(
    //   this.registerForm.value.firstName,
    //   this.registerForm.value.lastName,
    //   this.registerForm.value.personalNumber,
    //   this.registerForm.value.phone,
    //   this.registerForm.value.group,
    //   this.registerForm.value.email,
    //   this.userId
    // );
    // if (this.profilesEmail === this.registerForm.value.email) {
    //   if (this.curRegister) {
    //     this.store.dispatch(new RegistrationActions.RegistrationEditStart());
    //   }
    //   this.store.dispatch(new RegistrationActions.AddUser(this.registrationForm));
    //   this.validRegistration = true;
    //   this.store.dispatch(new RegistrationActions.StoreUsers());
    //   this.store.dispatch(new RegistrationActions.CurRegistration(this.registrationForm));
    //   this.imageService.uploadImage(this.imgFile, this.userId);
    // } else {
    //   this.errorService.errorMessage = 'You are not signed up with this email!';
    // }
  }

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   if (this.validRegistration) {
  //     return true;
  //   }
  //   if (!this.validRegistration) {
  //     let msg = '';
  //     return confirm(msg);
  //   }
  // }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.registerForm.get(controlName);
  }

  initForm(profile: Consumer = null) {
    this.registerForm = new FormGroup({
      firstName: new FormControl(profile?.firstName || null, [
        AppValidators.required,
        AppValidators.minLength(2),
        AppValidators.maxLength(50)
      ]),
      lastName: new FormControl(profile?.lastName || null, [
        AppValidators.required,
        AppValidators.minLength(2),
        AppValidators.maxLength(50)
      ]),
      gender: new FormControl(profile?.gender || null, [
        AppValidators.required
      ]),
      personalNumber: new FormControl(profile?.personalNumber || null, [
        AppValidators.required,
        AppValidators.minLength(11),
        AppValidators.maxLength(11)
      ]),
      phone: new FormControl(profile?.phone || null, [AppValidators.required]),
      address: new FormControl(profile?.address || null, [
        AppValidators.required,
        AppValidators.minLength(9),
        AppValidators.maxLength(9)
      ]),
      country: new FormControl(profile?.country || null, [
        AppValidators.required
      ]),
      city: new FormControl(profile?.city || null, [AppValidators.required]),
      email: new FormControl(profile?.email || null, [
        AppValidators.required,
        AppValidators.email,
        AppValidators.cannotContainSpace
      ]),
      files: new FormControl(profile?.imagePath)
    });
  }

  selectedFile: ImageSnippet;

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.registerForm.value.files = [file];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
    });
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.registrationSub?.unsubscribe();
  }
}
