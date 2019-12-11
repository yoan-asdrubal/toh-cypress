/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  18/3/2019
 *
 */

import {AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {Settings} from '@app/app.settings.model';
import {AppState, settingsSelector, urlMapSelector} from '../../store';
import {Store} from '@ngrx/store';
import {untilDestroyed} from 'ngx-take-until-destroy';


@Component({
	selector: 'app-iframe',
	templateUrl: './iframe.component.html',
	styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit, AfterViewInit, OnDestroy {
	title = '';
	@Input('url') url = 'about:blank';
	@Input('loading') loading = true;
	public settings: Settings;
	@Input('external') external = false;

	class: string; // width-sm (<=1024) , width-md (1024 > size <= 1366) , width-lg ( 1366 >)
	constructor(public router: Router
		, private store: Store<AppState>) {

		this.store.select(settingsSelector).subscribe((sets) => {
			this.settings = sets;
		});
	}

	ngOnInit() {

		// Determinando la url que debe mostrarse en el iframe.
		if (!this.external) {
			this.getUrlToIframe();
		}

		// Procesar el Iframe y modificar su html cuando se carga.
		this.processAndModifyIframe();

		// Seleccionar el estilo que corresponde al iframe segun el ancho del navegador.
		this.updateIframeWidth();
	}

	ngOnDestroy(): void {
	}

	getUrlToIframe() {
		let url = this.router.url;

		url = url.startsWith('/') ? url.substring(1, url.length) : url;

		this.store.select(urlMapSelector)
			.pipe(
				untilDestroyed(this),
				filter(urls => Object.keys(urls).length > 0),
				map(urls => urls[url]),
				tap(urlFilter => {
					if (urlFilter === undefined && !this.external) {
						this.router.navigate(['/PaginaNoEncontrada']);
					}
				}),
				filter(urlFilter => urlFilter !== undefined)
			).subscribe(urlFilter => this.url = urlFilter);

	}

	processAndModifyIframe() {

		fromEvent($('#iframe'), 'load')
			.pipe(
				untilDestroyed(this),
				filter(() => this.url !== 'about:blank'),
				tap(() => {
					// console.log('SE LEYO EL IFRAME ', this.url);
					this.loading = false;
					const iFrameContents = $('#iframe').contents();

					const title = iFrameContents.find('h1');

					if (title.length > 0) {

						const iframeBody = iFrameContents.find('body');
						if (iframeBody.length > 0) {
							$(iframeBody[0]).css('width', '97%');
							$(iframeBody[0]).css('overflowY', 'scroll');
							$(iframeBody[0]).css('overflowX', 'hidden');
						}

						$(title[0]).css('color', 'black');
						$(title[0]).css('margin-left', '25px');


						const header = iFrameContents.find('.header-iframe');
						$(header).css('display', 'flex');
						$(header).css('justify-content', 'space-between');
						$(header).css('align-items', 'center');

						const body_margen = iFrameContents.find('.body-margen');
						$(body_margen).css('background', 'none');

						const breadcrumb = iFrameContents.find('.breadcrumb');
						if (breadcrumb.length > 0) {
							$(breadcrumb[0]).css('display', 'flex');
							$(breadcrumb[0]).css('position', 'relative');
							$(breadcrumb[0]).css('top', 0);
							$(breadcrumb[0]).css('padding-bottom', 0);
							$(breadcrumb[0]).css('padding-top', 0);
							$(breadcrumb[0]).css('font-size', '16px');
							$(breadcrumb[0]).css('order', '1');
							$(breadcrumb[0]).css('padding-right', '25px');
						}
					}
				})
			).subscribe();


	}

	ngAfterViewInit() {

	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.updateIframeWidth();
	}

	updateIframeWidth() {
		const width = window.innerWidth;
		if (width <= 1200) {
			this.class = 'width-sm';
		} else if (width > 1024 && width <= 1366) {
			this.class = 'width-md';
		} else {
			this.class = 'width-lg';
		}
	}
}
