import {Pipe, PipeTransform} from '@angular/core';

/**
 * Permite filtrar sobre un arreglo de elementos, varios filtros al mismo tiempo sobre varias propiedades
 */
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    /**
     * Filtra sobre un conjunto de elementos aplicando varios filtros
     *Los filtros se especifican en un mapa de datos , el campo key es solo para identificarlo dentro del mapa, no se utiliza en el filtro
     *Para cada filtro se debe definir el campo filter, con el valor a filtrar , y el campo keys
     * con las columnas a las que se desea aplicar ese filtro.
     * Los keys pueden especificar el path hacia la propiedad que se desea tener en cuenta, permitiendo filtrar por
     * propiedades existentes en los hijos
     * Ejemplos de filtros
     * @example
     * {
     *     filtro_by_nombre:{
     *         filter:'FONS',
     *         keys:['nombre']
     *     }
     * }
     * @example
     * {
     *     filtro_by_address:{
     *         filter:'Obispo',
     *         keys:['direccion.calle']
     *     }
     * }
     *
     * @example
     * {
     *     filtro_by_nombre_apellidos:{
     *         filter:'FONS',
     *         keys:['nombre', 'apellido']
     *     },
     *     filter_by_direccion:{
     *         filter:'CUB',
     *         keys:['direccion.calle']
     *     }
     * }
     *
     * @param items Elementos
     * @param filters Filtros a aplicar
     */
    transform(items: any[], filters: { [key: string]: { filter: string, keys?: string[] } }) {
        if (!items) {
            return [];
        }
        if (!filters) {
            return items;
        }
        const filterValues = Object.values(filters);
        const predicate = (item: any) => {
            return filterValues.filter(filter => {

                if (!filter.filter || filter.filter.toString().trim().length === 0) {
                    return true;
                }
                if (!filter.keys || filter.keys.length === 0) {
                    return item.toString().toLowerCase().indexOf(filter.filter.toString().toLowerCase()) > -1;
                }

                if (!Array.isArray(filter.keys)) {
                    // tslint:disable-next-line:no-unused-expression
                    console.warn('El campo <keys> debe ser de tipo  <string[]>, es de tipo <' + (typeof filter.keys) + '> con valor <' + filter.keys + '>');
                    return false;
                }

                if (filter.keys.length === 0) {
                    return true;
                }

                return filter.keys.filter(key => {
                    const value = key.split('.')
                        .reduce((result, _field) => {
                            if (!result) {
                                return null;
                            }
                            if (!result.hasOwnProperty(_field)) {
                                return null;
                            }
                            const fieldValue = result[_field];

                            if (fieldValue === null || fieldValue === undefined) {
                                return null;
                            }
                            return fieldValue;
                        }, item);
                    // const value = item[key];

                    if (value) {
                        return value.toString().toLowerCase().indexOf(filter.filter.toString().toLowerCase()) > -1;
                    } else {
                        console.warn('La propiedad  ', key, ' tiene valor ', value);
                    }
                    return false;
                }).length > 0;
            }).length === filterValues.length;

        };
        return items.filter(item => predicate(item));

    }

}
