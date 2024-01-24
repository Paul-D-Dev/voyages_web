import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddress } from "../../shared/interfaces/address.interface";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";

@Component({
  selector: 'app-address-item',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent {
  @Input() addressList: IAddress[] = [];
  @Output() selectAddress = new EventEmitter<IAddress>();
  protected readonly Icons = Icons;

  onSelect(address: IAddress): void {
    this.selectAddress.emit(address);
  }

}
