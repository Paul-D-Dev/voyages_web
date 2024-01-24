export interface IAddress {
  id: number
  fullAddress: string;
  label: string;
  type: string;
  lat: number;
  lng: number;
  boundingBox: string[],
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
}
