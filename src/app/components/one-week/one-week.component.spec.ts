import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWeekComponent } from './one-week.component';

describe('OneWeekComponent', () => {
  let component: OneWeekComponent;
  let fixture: ComponentFixture<OneWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
