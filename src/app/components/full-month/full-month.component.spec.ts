import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMonthComponent } from './full-month.component';

describe('FullMonthComponent', () => {
  let component: FullMonthComponent;
  let fixture: ComponentFixture<FullMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
