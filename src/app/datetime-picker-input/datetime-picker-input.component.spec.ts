import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickerInputComponent } from './datetime-picker-input.component';

describe('DatetimePickerInputComponent', () => {
  let component: DatetimePickerInputComponent;
  let fixture: ComponentFixture<DatetimePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatetimePickerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
