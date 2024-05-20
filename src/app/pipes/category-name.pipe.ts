import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  transform(categories: any[], column: string): string[] {
    return categories.map(category => category[column]);
  }

}
