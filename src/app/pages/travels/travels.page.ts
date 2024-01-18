import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './travels.page.html',
  styleUrl: './travels.page.scss'
})
export class TravelsPage {

}
