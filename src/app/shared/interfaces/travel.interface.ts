export interface ITravel {
  id: number,
  name: string,
  dateStart: Date,
  dateEnd: Date
}

export type ITravelFormData = Omit<ITravel, 'id'>
