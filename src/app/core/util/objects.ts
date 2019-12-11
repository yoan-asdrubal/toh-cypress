/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  23/5/2019
 *
 */
import {compare} from 'fast-json-patch';

export function getOrDefault(object, field, def = '') {
    if (!object) {
        return def;
    }
    return field.split('.')
        .reduce((result, _field) => result && result[_field], object) || def;
}

export function replaceAll(target, search, replacement) {
    return target.split(search).join(replacement);
}

export function cleanEmptyProperties(object) {
    let value = object;

    if (typeof value === 'object' && !Array.isArray(value)) {
        value = Object.assign({}, value);
        Object.keys(value).forEach((key) => {
            const prop = value[key];
            if (!!prop || prop === 0 || prop === 1) {
                if (typeof prop === 'object' && Object.keys(prop).length > 0 && !Array.isArray(prop)) {
                    value[key] = cleanEmptyProperties(prop);
                    if (Object.keys(value[key]).length === 0) {
                        delete value[key];
                    }
                } else if (Array.isArray(prop)) {
                    value[key] = cleanEmptyProperties(prop);
                    if ((value[key] as any[]).length === 0) {
                        delete value[key];
                    }
                } else if (value[key].toString().trim() === '') {
                    delete value[key];
                }
            } else {
                delete value[key];
            }
        });
    }
    if (Array.isArray(value)) {
        value = Array.of(...value);
        const newArray = [];
        value.forEach((p, i) => {
            if (typeof p === 'object' && !Array.isArray(p)) {
                value[i] = cleanEmptyProperties(p);

                if (Object.keys(value[i]).length !== 0) {
                    newArray.push(value[i]);
                }
            } else if (Array.isArray(p)) {
                value[i] = cleanEmptyProperties(p);
                if ((value[i] as any[]).length !== 0) {
                    newArray.push(value[i]);
                }
            } else if (value[i].toString().trim() !== '') {
                newArray.push(value[i]);
            }
        });
        value = newArray;
    }

    return value;
}

export function diffBetweenObjects(object1, object2, invert = false) {
    return compare(object1, object2, invert);
}
