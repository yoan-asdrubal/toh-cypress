import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from '@app/shared/pipes/pipes.module';
import {IframeComponent} from '@app/shared/iframe/iframe.component';

@NgModule({
	declarations: [IframeComponent],
	imports: [
		CommonModule, PipesModule
	],
	exports: [IframeComponent]
})
export class IframeModule {
}
