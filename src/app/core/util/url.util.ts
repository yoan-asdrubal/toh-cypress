/**
 * Created by jaimbert on 29/07/17.
 */
import {QueryInfo, FilterInfo, SortDirection} from './filters.util';
import * as moment from 'moment';

type Params = { [key: string]: any };


export class UrlUtil {

  static paramsFrom(options: QueryInfo): Params {


    const keys = Object.keys(options);
    const res: any = {};


    /**
     * Adicionando parametros de paginado
     *
     * */
    if (options.page) res.page = options.page;
    if (options.limit) res.paginate = options.limit;


    /**
     * Adicionando parametros de ordenamiento
     *
     * */
    if (options.sort) {

      res.orderBy = options.sort[0].field;
      res.direction = options.sort[0].dir == SortDirection.ASC ? 'ASC' : 'DESC';
    }


    /**
     * Adicionando filters
     *
     * */
    const fixedFilters = options.fixedFilters || [];
    const customFilters = options.filters || [];

    const filters = fixedFilters
      .filter(filter => customFilters.every(_filter => _filter.field != filter.field))
      .concat(customFilters);


    if (filters.length > 0) {


      let filter: string = filters


        .map(f => parseFilter(f))


        .join(',');

      res.filter = `[${filter}]`;
    }

    return res;
  }

}


const parseFilter = (filter: FilterInfo): string => {

  const op = parseOp(filter);

  if (op != 'between') {
    let data = typeof filter.data == 'object' ? filter.data.value : filter.data;
    data = parseData(data, op);
    return `["${filter.field}", "${op}", ${data}]`;
  }

  let parse = [];

  if (filter.data.from) parse.push(`["${filter.field}", ">", ${parseData(filter.data.from, op)}]`);
  if (filter.data.to) parse.push(`["${filter.field}", "<", ${parseData(filter.data.to, op)}]`);

  return parse.join(',');
};


const opEquals = ['select', 'equals', 'date'];
const opBetween = ['nrange', 'drange'];
const dates = ['dmin', 'dmax'];
const noStringTypes = ['number', 'boolean'];


const parseData = (data: string, op: string) => {

  let _data = data;

  if (typeof data == 'string') {
    if (data.indexOf('/') < 0)
      try {
        _data = eval(_data)
      } catch (e) {
      }
    else
      _data = parseDate(data);
  }
  if (op == 'like') _data = `%${_data}%`;

  return noStringTypes.indexOf(typeof _data) >= 0 ? `${_data}` : `"${_data}"`;
};


const parseDate = (data: string) => {
  if (/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(data)) {
    const values = data.split('/');
    const newDate = [values[1], values[0], values[2]].join('/');
    return moment(new Date(newDate), 'L', 'es').format('YYYY/MM/DD');
  }
  return data;
};

const parseOp = (filter: FilterInfo) => {

  const op = filter.op;


  if (op == 'dmin') return '>';
  if (op == 'dmax') return '<';
  if (op == 'select_in') return 'in';
  if (opEquals.indexOf(op) >= 0) return '=';
  if (opBetween.indexOf(op) >= 0) return 'between';

  return op;
};
