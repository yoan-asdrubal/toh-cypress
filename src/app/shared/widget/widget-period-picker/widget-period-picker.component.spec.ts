import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPeriodPickerComponent } from './widget-period-picker.component';

describe('WidgetPeriodPickerComponent', () => {
  let component: WidgetPeriodPickerComponent;
  let fixture: ComponentFixture<WidgetPeriodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPeriodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
