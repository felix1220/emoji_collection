import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeWrapperComponent } from './tree-wrapper.component';

describe('TreeWrapperComponent', () => {
  let component: TreeWrapperComponent;
  let fixture: ComponentFixture<TreeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
