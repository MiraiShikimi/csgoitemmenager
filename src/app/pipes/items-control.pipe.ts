import { Pipe, PipeTransform } from '@angular/core';
import { csgoItem } from '../interface/csgoItem';

@Pipe({
  name: 'itemsControl'
})
export class ItemsControlPipe implements PipeTransform {

  transform(value: csgoItem[], filterString: string){
    if (value.length === 0 || filterString === ''){
    return value
  }

  const csgoItems = [];
  for (const item of value){

    if (item.displayName.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ){
    csgoItems.push(item)
  }
}
return csgoItems

}

}
