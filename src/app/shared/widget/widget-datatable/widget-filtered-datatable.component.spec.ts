import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetFilteredDatatableComponent } from './widget-filtered-datatable.component';

describe('WidgetFilteredDatatableComponent', () => {
  let component: WidgetFilteredDatatableComponent;
  let fixture: ComponentFixture<WidgetFilteredDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetFilteredDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetFilteredDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
