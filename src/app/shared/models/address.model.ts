import {
  IAddress,
  IAddressDetail,
  IAddressDetailResponseAPI,
  IAddressResponseAPI
} from "../interfaces/address.interface";

export class Address implements IAddress {
  id: number;
  fullAddress: string;
  label: string;
  type: string;
  lat: number;
  lng: number;
  boundingBox: string[];
  addressDetail: IAddressDetail;

  constructor(props: IAddressResponseAPI) {
    this.id = props.place_id;
    this.fullAddress = props.display_name;
    this.label = props.name;
    this.type = props.type;
    this.lat = +props.lat;
    this.lng = +props.lon;
    this.boundingBox = props.boundingbox;
    this.addressDetail = this._setDetail(props.address);
  }

  private _setDetail(detail: IAddressDetailResponseAPI): IAddressDetail {
    return {
      amenity: detail.amenity,
      houseNumber: detail.house_number,
      road: detail.road,
      city: detail.city,
      postcode: detail.postcode,
      country: detail.country,
      state: detail.state,
      countryCode: detail.country_code,
      suburb: detail.suburb
    };
  }


}
