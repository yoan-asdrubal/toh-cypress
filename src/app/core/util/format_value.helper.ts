/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  13/5/2019
 *
 */


/**
 * En una cadena de texto dado el   parametro {@link #formatterValues}, sustituye las ocurrencias del atributo
 * {@link #value} por atributo {@link #label} correspondiente
 * @param value cadena de texto
 * @param formatterValues arreglo de parametros a aplicar en el formato
 */
export function replaceValueToLabel(value, formatterValues: { label: string, value: string }[], tag = null) {

	if (typeof value !== 'string') {
		return value;
	}
	let localValue = value;
	const localFormat = formatterValues.slice();

	localFormat.forEach(item => {
			if (tag) {
				localValue = localValue.replace(new RegExp(item.value, 'g'), `<${tag}>${item.label}</${tag}>`);
			} else {
				localValue = localValue.replace(new RegExp(item.value, 'g'), `${item.label}`);
			}

		}
	);
	return localValue;
}

/**
 * En una cadena de texto dado el   parametro {@link #formatterValues}, sustituye las ocurrencias del atributo
 * {@link #label} por atributo {@link #value} correspondiente
 * @param value cadena de texto
 * @param formatterValues arreglo de parametros a aplicar en el formato
 */
export function replaceLabelToValue(value, formatterValues: { label: string, value: string }[]) {
	if (typeof value !== 'string') {
		return value;
	}

	let localValue = value;
	const localFormat = [...formatterValues];

	localFormat.forEach(item => {
			localValue = localValue.split(item.label).join(item.value);
		}
	);
	return localValue;
}

/**
 *  Reemplaza las cadenas de texto especificadas en @param replaces con el mismo valor dentro de la etiqueta tag
 * @param value
 * @param replaces
 * @param tag
 */
export function replaceWithTags(value, replaces: { [key: string]: { tag: string, class: string, values: string[] } }) {
	if (typeof value !== 'string') {
		return value;
	}

	let localValue = value;
	const localFormat = Object.keys(replaces);
	localFormat.forEach(tag => {
			const replace = replaces[tag];
			const values = replace.values || [];
			values.forEach(rep => {
				localValue = localValue.split(rep).join(`<${replace.tag} class="${replace.class}">${rep}</${replace.tag}>`);
			});
		}
	);
	return localValue;
}
