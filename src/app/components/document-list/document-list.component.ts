import { Component, Input, output } from '@angular/core';
import { ITravelDocument } from "../../shared/interfaces/travel.interface";
import { Icons } from "../../shared/enums/icons.enum";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { DocumentViewDialogComponent } from "../dialogs/document-view-dialog/document-view-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    TitleCasePipe
  ],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {
  constructor(private dialog: MatDialog) {
  }

  @Input() documents: ITravelDocument[] = [];
  onRemoveDocument = output<number>();

  protected readonly Icons = Icons;

  removeDocument(index: number): void {
    this.onRemoveDocument.emit(index);
  }

  viewDocument(index: number): void {
    this.dialog.open(DocumentViewDialogComponent, {
      width: '500px',
      data: {
        documents: this.documents,
        selectedIndex: index
      }
    });
  }
}
