import { Icons } from "../enums/icons.enum";

export interface IMenuButton {
  icon: Icons,
  label: string,
  onClick: () => void
}
