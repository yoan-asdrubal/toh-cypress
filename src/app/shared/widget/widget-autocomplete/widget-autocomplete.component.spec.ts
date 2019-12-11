import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAutocompleteComponent } from './widget-autocomplete.component';

describe('WidgetAutocompleteComponent', () => {
  let component: WidgetAutocompleteComponent;
  let fixture: ComponentFixture<WidgetAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
