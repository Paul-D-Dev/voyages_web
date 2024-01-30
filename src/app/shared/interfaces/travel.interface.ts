import { IGpsPosition } from "./gps-position.interface";
import { StepCategories } from "../enums/step-categories.enum";

export interface ITravelItem {
  id: number,
  name: string,
  dateStart: string,
  dateEnd: string
}

export type ITravelFormData = Omit<ITravelItem, 'id'>

export interface ITravel extends ITravelItem {
  steps: ITravelStep[];
}

export interface ITravelStep {
  id: number,
  index: number,
  label: string,
  category: StepCategories | null, // Flight, Road, Hotel / Rest, Restaurant, Party, Activities
  description?: string,
  location: IGpsPosition,
  dateStart: string,
  dateEnd: string,
  createdDate: Date,
  updatedDate?: Date,
  // customIcon
}

export type ITravelStepFormData = Omit<ITravelStep, 'id' | 'index' | 'createdDate' | 'updatedDate'>
