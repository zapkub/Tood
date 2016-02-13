import {RANDOM_DATE} from './actions'
export function random (result = '' ,action){
  switch (action.type) {
    case RANDOM_DATE:
      let yearRange = chance.year({min: 2015, max: 2050}) ;
      let date = moment(chance.date({year:yearRange}))
      return date;
    default:
      return result;
  }
}
