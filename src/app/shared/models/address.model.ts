import { IAddress, IAddressResponseAPI } from "../interfaces/address.interface";

export class Address implements IAddress {
  id: number;
  fullAddress: string;
  label: string;
  type: string;
  lat: number;
  lng: number;
  boundingBox: string[];

  constructor(props: IAddressResponseAPI) {
    this.id = props.place_id;
    this.fullAddress = props.display_name;
    this.label = props.name;
    this.type = props.type;
    this.lat = +props.lat;
    this.lng = +props.lon;
    this.boundingBox = props.boundingbox;
  }

}
