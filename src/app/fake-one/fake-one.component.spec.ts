import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeOneComponent } from './fake-one.component';

describe('FakeOneComponent', () => {
  let component: FakeOneComponent;
  let fixture: ComponentFixture<FakeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
