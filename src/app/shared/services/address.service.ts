import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { IAddress, IAddressResponseAPI } from "../interfaces/address.interface";
import { Address } from "../models/address.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _http = inject(HttpClient);
  private readonly geoSearchAPI = environment.geoSearchAPI;

  lookUp(query: string | null): Observable<IAddress[]> {
    if (query) {
      const url = `${this.geoSearchAPI}/search?addressdetails=1&q=${query}&format=jsonv2`;
      return this._http.get<IAddressResponseAPI[]>(url).pipe(
        // TODO filter result near by user
        // map(result => result.filter(address => !!address.address.road)),
        map((result) => {
          return result.map(address => new Address((address)));
        })
      );
    } else {
      return of([]);
    }
  }
}
