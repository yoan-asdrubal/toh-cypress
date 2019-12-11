import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from '@app/shared/pipes/safe.pipe';
import {FilterPipe} from '@app/shared/pipes/filter.pipe';
import {SliceItemsPipe} from '@app/shared/pipes/slice-items.pipe';
import {GeneratePagesPipe} from '@app/shared/pipes/generate-pages.pipe';
import {TruncatePipe} from '@app/shared/pipes/truncate/truncate.pipe';
import { FillPipe } from './fill.pipe';
import { HighlightPipe } from './highlight/highlight.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		SafePipe,
		FilterPipe,
		SliceItemsPipe,
		GeneratePagesPipe,
		TruncatePipe,
		FillPipe,
		HighlightPipe
	],
	exports: [
		SafePipe,
		FilterPipe,
		SliceItemsPipe,
		GeneratePagesPipe,
		TruncatePipe,
		HighlightPipe,
		FillPipe
	]
})
export class PipesModule {
}
