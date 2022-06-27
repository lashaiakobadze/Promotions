import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], filterField: string): any[] {
    if (!items) return [];
    if (!filterField) return items;
    filterField = filterField.toString().toLowerCase();
    return items.filter((item) =>
      item?.firstName.toLowerCase().includes(filterField)
    );
  }
}
