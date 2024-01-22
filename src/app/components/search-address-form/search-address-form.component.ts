import { Component, inject, Input, OnInit } from '@angular/core';
import { debounceTime, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { Location } from "@angular/common";

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
  @Input() searchIsFocused: boolean | null = false;

  http = inject(HttpClient);
  location = inject(Location);
  currentPath = this.location.path();
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
      this.searchIsFocused = true;
      this.location.replaceState(`${this.currentPath}?search=true`);
    }
  }

  backNav() {
    if (this.searchIsFocused) {
      this.searchIsFocused = false;
      this.location.replaceState(this.currentPath);
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
