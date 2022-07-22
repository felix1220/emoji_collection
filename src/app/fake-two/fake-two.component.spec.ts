import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeTwoComponent } from './fake-two.component';

describe('FakeTwoComponent', () => {
  let component: FakeTwoComponent;
  let fixture: ComponentFixture<FakeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
