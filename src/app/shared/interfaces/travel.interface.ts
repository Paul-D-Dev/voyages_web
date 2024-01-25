import { IGpsPosition } from "./gps-position.interface";

export interface ITravel {
  id: number,
  name: string,
  dateStart: Date,
  dateEnd: Date
}

export type ITravelFormData = Omit<ITravel, 'id'>

export interface ITravelDetail extends ITravel {
  steps: ITravelStep[];
}

export interface ITravelStep {
  id: number,
  index: number,
  label: string,
  category: string, // Flight, Road, Hotel / Rest, Restaurant, Party, Activities
  description?: string,
  location: IGpsPosition,
  dateStart: Date,
  dateEnd: Date
  createdDate: Date,
  updatedDate?: Date,
  // customIcon
}
