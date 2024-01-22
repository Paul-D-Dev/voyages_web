import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from "rxjs";

@Pipe({
  name: 'asyncBoolean',
  standalone: true
})
export class AsyncBooleanPipe implements PipeTransform {

  transform(value$: Observable<boolean | null>): boolean {
    let result: boolean = false;
    value$.pipe(
      map(value => result = value === null ? false : value)
    ).subscribe();
    return result;
  }

}
