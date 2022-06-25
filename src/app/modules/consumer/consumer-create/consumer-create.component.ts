import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConsumerService } from '../consumer.service';

import { mimeType } from './mime-type.validator';
import { AuthService } from 'src/app/auth/auth.service';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { Consumer } from 'src/app/models/consumer.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-consumer-create',
  templateUrl: './consumer-create.component.html',
  styleUrls: ['./consumer-create.component.scss']
})
export class ConsumerCreateComponent implements OnInit, OnDestroy {
  consumer: Consumer;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  mode = 'create';
  localFormError = '';
  private id: string;
  private authStatusSub: Subscription;

  constructor(
    public consumersService: ConsumerService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.initForm();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('consumerId')) {
        this.mode = 'edit';
        this.id = paramMap.get('consumerId');
        this.isLoading = true;

        this.consumersService
          .getConsumer(this.id)
          .subscribe((consumerData: any) => {
            this.isLoading = false;

            this.consumer = {
              id: consumerData?._id,
              firstName: consumerData?.firstName,
              lastName: consumerData?.lastName,
              gender: consumerData?.gender,
              personalNumber: consumerData?.personalNumber,
              phone: consumerData?.phone,
              address: consumerData?.address,
              country: consumerData?.country,
              city: consumerData?.city,
              email: consumerData?.email,
              imagePath: consumerData?.imagePath,
              creator: consumerData?.creator
            };

            this.initForm(this.consumer);
          });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      this.localFormError =
        'The form is not fully filled or the photo is missing';
      return;
    }
    this.localFormError = '';
    this.isLoading = true;
    if (this.mode === 'create') {
      this.consumersService.addConsumer(this.form.value);
    } else {
      this.consumersService.updateConsumer(this.form.value);
    }
    this.form.reset();
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.form.get(controlName);
  }

  initForm(consumer: Consumer = null): void {
    this.form = new FormGroup({
      id: new FormControl(consumer?.id || null),
      firstName: new FormControl(consumer?.firstName || null, [
        AppValidators.required,
        AppValidators.minLength(2),
        AppValidators.maxLength(50)
      ]),
      lastName: new FormControl(consumer?.lastName || null, [
        AppValidators.required,
        AppValidators.minLength(2),
        AppValidators.maxLength(50)
      ]),
      gender: new FormControl(consumer?.gender || null, [
        AppValidators.required
      ]),
      personalNumber: new FormControl(consumer?.personalNumber || null, [
        AppValidators.required,
        AppValidators.minLength(11),
        AppValidators.maxLength(11)
      ]),
      phone: new FormControl(consumer?.phone || null, [
        AppValidators.required,
        AppValidators.minLength(9),
        AppValidators.maxLength(9)
      ]),
      address: new FormControl(consumer?.address || null, [
        AppValidators.required
      ]),
      country: new FormControl(consumer?.country || null, [
        AppValidators.required
      ]),
      city: new FormControl(consumer?.city || null, [AppValidators.required]),
      email: new FormControl(consumer?.email || null, [
        AppValidators.required,
        AppValidators.email,
        AppValidators.cannotContainSpace
      ]),
      image: new FormControl(consumer?.imagePath || null, {
        validators: [AppValidators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
