/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  15/5/2019
 *
 */

export function isNull(value: any) {
	return value === null;
}

export function isNotNull(value: any) {
	return value !== null;
}

export function isNullOrUndefined(value: any) {
	return value === null || value === undefined;
}

export function isNotNullOrUndefined(value: any) {
	return value !== null && value !== undefined;
}

export function isArray(value: any) {
	return Array.isArray(value) || value instanceof Array;
}

export function isBoolean(value: any) {
	return typeof value === 'boolean';
}

export function isFunction(value: any) {
	return typeof value === 'function';
}

export function isNumber(value: any) {
	return typeof value === 'number';
}

export function isObject(value: any) {
	return value !== null && typeof value === 'object';
}

export function isPrimitive(value: any) {
	return (typeof value !== 'object' && typeof value !== 'function') || value === null;
}

export function isString(value: any) {
	return typeof value === 'string';
}

export function isUndefined(value: any) {
	return value === undefined;
}

export function isNotUndefined(value: any) {
	return value !== undefined;
}
