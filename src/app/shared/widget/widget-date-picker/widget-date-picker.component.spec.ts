import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDatePickerComponent } from './widget-date-picker.component';

describe('WidgetDatePickerComponent', () => {
  let component: WidgetDatePickerComponent;
  let fixture: ComponentFixture<WidgetDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
