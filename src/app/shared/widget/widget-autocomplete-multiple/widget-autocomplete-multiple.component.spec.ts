import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAutocompleteMultipleComponent } from './widget-autocomplete-multiple.component';

describe('WidgetAutocompleteMultipleComponent', () => {
  let component: WidgetAutocompleteMultipleComponent;
  let fixture: ComponentFixture<WidgetAutocompleteMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetAutocompleteMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAutocompleteMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
