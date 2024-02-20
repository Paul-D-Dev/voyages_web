import { ITravel, ITravelFormData } from "../interfaces/travel.interface";

export function convertTravelToFormData(travel: ITravel | undefined): ITravelFormData | undefined {
  if (!travel) {
    return undefined;
  }

  const { id, steps, ...data } = travel;
  return data;
}
