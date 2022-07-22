import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitSpriteComponent } from './split-sprite.component';

describe('SplitSpriteComponent', () => {
  let component: SplitSpriteComponent;
  let fixture: ComponentFixture<SplitSpriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitSpriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitSpriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
