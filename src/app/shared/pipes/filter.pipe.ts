import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable()
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    /* transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
        return items.filter(item => {
            const notMatchingField = Object.keys(filter)
                                         .find(key => item[key] !== filter[key]);

            return !notMatchingField; // true if matches all fields
        });
    } */
    transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
        return items.filter(item => {
            const matchingField = Object.keys(filter)
                                        .find(
                                            // key => item[key] === filter[key]
                                            key => {
                                                if(item[key].toString().toLocaleLowerCase().includes(filter[key].toString().toLocaleLowerCase())){
                                                    return true;
                                                }
                                            }
                                        );
            return matchingField; // true if matches all fields
        });
    }
}