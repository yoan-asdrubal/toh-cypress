import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TohHomeComponent } from './toh-home.component';

describe('TohHomeComponent', () => {
  let component: TohHomeComponent;
  let fixture: ComponentFixture<TohHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TohHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TohHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
