import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAutocompleteItemComponent } from './search-autocomplete-item.component';

describe('SearchAutocompleteItemComponent', () => {
  let component: SearchAutocompleteItemComponent;
  let fixture: ComponentFixture<SearchAutocompleteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAutocompleteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAutocompleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
