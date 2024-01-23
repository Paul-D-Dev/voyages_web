import { Component, inject, Input, OnInit } from '@angular/core';
import { debounceTime, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { GlobalStateService } from "../../shared/services/global-state.service";

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
      })
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
  lookUp(query: string | null) {
    if (query) {
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
      return this.http.get(url);
    } else {
      return of([]);
    }
  }
}
