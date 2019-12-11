/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  21/3/2019 
 *
 */
declare const Buffer;

export function objToBase64(object: any) {
	let objJsonStr = object;
	if(typeof object !== 'string')
		objJsonStr = JSON.stringify(object)
	// const objJsonB64 = Buffer.from(objJsonStr).toString('base64');
	const objJsonB64 = btoa(objJsonStr);

	return objJsonB64;
}

export function base64ToObj(object: string) {

	const objB64toObje = atob(object);

	const obj = JSON.parse(objB64toObje);

	return obj;
}
