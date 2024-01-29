import { IGpsPosition } from "./gps-position.interface";

export interface ITravelItem {
  id: number,
  name: string,
  dateStart: Date,
  dateEnd: Date
}

export type ITravelFormData = Omit<ITravelItem, 'id'>

export interface ITravel extends ITravelItem {
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

export type ITravelStepFormData = Omit<ITravelStep, 'id' | 'index' | 'createdDate' | 'updatedDate'>
