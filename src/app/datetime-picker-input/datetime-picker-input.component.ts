import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'date-timepicker-input',
  templateUrl: './datetime-picker-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerInputComponent),
      multi: true,
    }],
  styleUrls: ['./datetime-picker-input.component.scss']
})
export class DatetimePickerInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  formGroup: FormGroup | undefined = undefined;
  @Input() minDateTime: string | null = null;
  @Input() maxDateTime: string | null = null;

  public isDisabled: boolean = false;
  private dateTimeValueSub: Subscription | null = null;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      dateTime: ''
    });

    this.dateTimeValueSub = this.formGroup.controls['dateTime'].valueChanges.subscribe((value) => {
      console.log('date time', value);
      this.propagateChange(value);
    });
  }
  public onInvalid(event?: any) {
    console.log('invalid', event);
  }

  public writeValue(value: string) {
    if(this.formGroup && this.formGroup.get('dateTime')) {
    
      this.formGroup.controls['dateTime'].patchValue(value);

    }
    
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    console.log('is disabled', this.isDisabled);
  }
  
  public ngOnDestroy(): void {
    if(this.dateTimeValueSub) {
      this.dateTimeValueSub.unsubscribe();
    }
    
  }

  private propagateChange = (_: any) => { };

}
