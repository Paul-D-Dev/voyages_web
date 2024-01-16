import { Component } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

}
