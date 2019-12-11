import {IframeComponent} from './iframe.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SafePipe} from '@app/shared/pipes/safe.pipe';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store} from '@ngrx/store';

fdescribe('IframeComponent', () => {
	let component: IframeComponent;
	let fixture: ComponentFixture<IframeComponent>;
	let store: MockStore<{ urlMap: {} }>;
	const initialState = {urlMap: {}};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule, PerfectScrollbarModule
			],
			declarations: [IframeComponent, SafePipe]
			, providers: [
				provideMockStore({initialState})
			]
		});
	});
	beforeEach(() => {
		fixture = TestBed.createComponent(IframeComponent);
		component = fixture.componentInstance;
		store = TestBed.get(Store);
	});
	it(`should be created`, () => {
		expect(component).toBeTruthy();
	});
});
