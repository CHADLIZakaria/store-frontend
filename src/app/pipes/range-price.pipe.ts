import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangePrice'
})
export class RangePricePipe implements PipeTransform {

  transform(categories: any[], column: string): string[] {
    return categories.map(category => category[column]);
  }


}
