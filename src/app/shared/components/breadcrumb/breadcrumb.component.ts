import {Component} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, UrlSegment} from '@angular/router';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

	public breadcrumbs: {
		name: string;
		url: string
	}[] = [];


	constructor(
		public router: Router, private activeRoute: ActivatedRoute) {

		this.parseRoute(activeRoute.snapshot.root);

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.breadcrumbs = [];
				this.parseRoute(this.router.routerState.snapshot.root);
			}
		});
	}


	private parseRoute(node: ActivatedRouteSnapshot) {

		if (node.url.length && (!node.data['breadcrumb'] || !node.data['breadcrumb']['show'])) {
			this.breadcrumbs = [];
			return;
		}
		if (node.data['breadcrumb']) {
			if (node.url.length) {
				let urlSegments: UrlSegment[] = [];
				node.pathFromRoot.forEach(routerState => {
					urlSegments = urlSegments.concat(routerState.url);
				});
				const url = urlSegments.map(urlSegment => {
					return urlSegment.path;
				}).join('/');
				this.breadcrumbs.push({
					name: node.data['breadcrumb']['name'],
					url: '/' + url
				});
			}
		}
		if (node.firstChild) {
			this.parseRoute(node.firstChild);
		}
	}

}
