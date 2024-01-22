import { Component, inject } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { SearchAddressFormComponent } from "../../components/search-address-form/search-address-form.component";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { AsyncBooleanPipe } from "../../shared/pipes/async-boolean.pipe";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    SearchAddressFormComponent,
    AsyncPipe,
    AsyncBooleanPipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  routes = inject(ActivatedRoute);
  searchFocused$: Observable<boolean | null> = this.getParamsSearchValue();


  getParamsSearchValue(): Observable<boolean> {
    // TODO fix can't get the params changed (add and remove '?search=true' do not catch)
    console.log('call');
    return this.routes.queryParams.pipe(
      map(params => {
        console.log(params);
        return params['search'];
      })
    );
  }

}
