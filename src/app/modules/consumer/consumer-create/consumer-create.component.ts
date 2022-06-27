import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { mimeType } from './mime-type.validator';
import { ConsumerService } from '../../../services/consumer.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { Consumer } from 'src/app/models/consumer.model';

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
  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    public consumersService: ConsumerService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((paramMap: ParamMap) => {
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

    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authStatus: boolean) => {
        this.isLoading = false;
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

  onSaveConsumer() {
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
        AppValidators.maxLength(11),
        AppValidators.pattern('^[0-9]*$', 'only number')
      ]),
      phone: new FormControl(consumer?.phone || null, [
        AppValidators.required,
        AppValidators.minLength(9),
        AppValidators.maxLength(9),
        AppValidators.pattern('^[0-9]*$', 'only number')
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
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
