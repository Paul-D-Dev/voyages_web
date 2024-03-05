import { Injectable } from '@angular/core';
import { IGpsPosition } from "../interfaces/gps-position.interface";

@Injectable({
  providedIn: 'root'
})

// TODO try to init url from app.config with Injection token
export class OpenOnMapsAppService {

  private readonly googleMapsUrl: string = 'https://maps.google.com/?q=';

  // TODO add Plan IOS url

  viewLocation(location: IGpsPosition): void {
    const coords: string = `${location.lat},${location.lng}`;
    // TODO handle maps provider PLAN for IOS device
    // if (IOS) {
    // } else {
    //
    // }
    window.open(this.googleMapsUrl + coords);

  }
}
