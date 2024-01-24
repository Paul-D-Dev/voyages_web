import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { debounceTime, map, Observable, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { IAddress, IAddressResponseAPI } from "../../shared/interfaces/address.interface";
import { Address } from "../../shared/models/address.model";

@Component({
  selector: 'app-search-address-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './search-address-form.component.html',
  styleUrl: './search-address-form.component.scss'
})
export class SearchAddressFormComponent implements OnInit {
  @Input() searchIsFocused: boolean = false;
  @Output() addressResult = new EventEmitter<IAddress[]>();

  http = inject(HttpClient);
  globalStateService = inject(GlobalStateService);
  protected readonly Icons = Icons;
  searchValue = new FormControl('');

  ngOnInit() {
    this.searchValue.valueChanges.pipe(
      debounceTime(1000),
      switchMap((value) => {
        console.log(value);
        return this.lookUp(value);
      }),
      tap(result => this.addressResult.emit(result))
    ).subscribe();
  }

  onFocused() {
    if (!this.searchIsFocused) {
      this.globalStateService.set("isSearchFocused", true);
    }
  }

  backNav() {
    if (this.searchIsFocused) {
      this.globalStateService.set("isSearchFocused", false);
    }
  }

  // Moves to service
  lookUp(query: string | null): Observable<IAddress[]> {
    if (query) {
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
      return this.http.get<IAddressResponseAPI[]>(url).pipe(
        map((result) => {
          return result.map(address => new Address((address)));
        })
      );
    } else {
      return of([]);
    }
  }
}
