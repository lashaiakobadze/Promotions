import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPromo'
})
export class FilterByPromoPipe implements PipeTransform {
  transform(items: any[], filterField: string): any[] {
    if (!items) return [];
    if (!filterField) return items;
    filterField = filterField.toString().toLowerCase();
    return items.filter((item) =>
      item?.promoType?.toLowerCase().includes(filterField)
    );
  }
}
