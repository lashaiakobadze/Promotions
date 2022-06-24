import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerContainerComponent } from './consumer-container.component';

describe('ConsumerContainerComponent', () => {
  let component: ConsumerContainerComponent;
  let fixture: ComponentFixture<ConsumerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
