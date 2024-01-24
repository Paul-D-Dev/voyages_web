export interface IAddress {
  id: number
  fullAddress: string;
  label: string;
  type: string;
  lat: number;
  lng: number;
  boundingBox: string[],
  addressDetail: IAddressDetail
}

export interface IAddressResponseAPI {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
  address: IAddressDetailResponseAPI;
}

export interface IAddressDetailResponseAPI {
  amenity?: string;
  house_number?: string;
  road?: string;
  city?: string;
  postcode?: string;
  state: string;
  country: string;
  country_code: string;
  suburb?: string;
}

export interface IAddressDetail {
  amenity?: string;
  houseNumber?: string;
  road?: string;
  city?: string;
  postcode?: string;
  country: string;
  state: string;
  countryCode: string;
  suburb?: string;
}
