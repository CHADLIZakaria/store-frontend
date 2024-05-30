import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangePrice'
})
export class RangePricePipe implements PipeTransform {

  transform(pricesRange: any[], column: string): string[] {
    if(column==='title') {
      return pricesRange.map(price => price['maxPrice']===null ? `+${price['minPrice']}$` : `${price['minPrice']}$ - ${price['maxPrice']}$`);
    }
    else if(column==='value') {
      return pricesRange.map(price => price['productCount']);
    }
    else if(column==='id') {
      return pricesRange.map(price => price['maxPrice']===null ? `${price['minPrice']}` : `${price['minPrice']}-${price['maxPrice']}`);
    }
    else return [];
  }


}
