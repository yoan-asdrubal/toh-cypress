import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgedFilterComponent } from './widget-filter.component';

describe('WidgedFilterComponent', () => {
  let component: WidgedFilterComponent;
  let fixture: ComponentFixture<WidgedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
