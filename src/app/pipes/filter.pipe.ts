import { Pipe, PipeTransform } from '@angular/core';
import { userItem } from '../interface/useritem';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: userItem[], filterString: string){
    if (value.length === 0 || filterString === ''){
    return value
  }

  const csgoItems = [];
  for (const item of value){

    if (item.csgoItem.displayName.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ){
    csgoItems.push(item)
  }
}
return csgoItems

}
}