import { Component, inject } from '@angular/core';
import { debounceTime, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-search-address-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-address-form.component.html',
  styleUrl: './search-address-form.component.scss'
})
export class SearchAddressFormComponent {

  http = inject(HttpClient);
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
