/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  4/4/2019
 *
 */

/**
 * Created by jacob1182 on 10/11/17.
 */

export interface FilterInfo {
	data: any;
	field: string;
	op: string;
}

export enum SortDirection {ASC, DESC, NONE}

export interface SortInfo {
	field: string;
	dir: SortDirection;
}

export class QueryInfo {
	page?: number = 1;
	limit?: number = 10;
	sort?: SortInfo[];
	filters?: FilterInfo[] = [];
	fixedFilters?: FilterInfo[] = [];
	urlParams?: any;
	queryParams?: any;
}
