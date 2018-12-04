import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventQuickComponent } from './add-event-quick.component';

describe('AddEventQuickComponent', () => {
  let component: AddEventQuickComponent;
  let fixture: ComponentFixture<AddEventQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
