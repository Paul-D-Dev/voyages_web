import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { debounceTime, switchMap, tap } from "rxjs";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { IAddress } from "../../shared/interfaces/address.interface";
import { AddressService } from "../../shared/services/address.service";

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
  addressService = inject(AddressService);
  globalStateService = inject(GlobalStateService);
  protected readonly Icons = Icons;
  searchValue = new FormControl('');

  ngOnInit() {
    this.searchValue.valueChanges.pipe(
      debounceTime(1000),
      switchMap((value) => this.addressService.lookUp(value)),
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

}
