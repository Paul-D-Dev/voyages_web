import { ITravelFormData } from "../interfaces/travel.interface";

export function setTravelFormData(data: ITravelFormData | undefined): ITravelFormData {
  const defaultData: ITravelFormData = {
    name: '',
    dateStart: new Date().toDateString(),
    dateEnd: new Date().toDateString()
  };
  return data ? data : defaultData;
}
