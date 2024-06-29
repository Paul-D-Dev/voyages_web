import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ITravelDocument } from "../../../shared/interfaces/travel.interface";
import { NgIf } from "@angular/common";
import { SafeUrlPipe } from "../../../shared/pipes/safe-url.pipe";

@Component({
  selector: 'app-document-view-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatIconButton,
    MatIcon,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf,
    SafeUrlPipe
  ],
  templateUrl: './document-view-dialog.component.html',
  styleUrl: './document-view-dialog.component.scss'
})
export class DocumentViewDialogComponent {
  documents: ITravelDocument[] = [];
  selectedIndex: number = 0;
  isImage: boolean = false;
  isPDF: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.documents = data.documents;
    this.selectedIndex = data.selectedIndex;
  }

  ngOnInit(): void {
    this.updateDocumentType();
  }

  updateDocumentType(): void {
    const fileType = this.documents[this.selectedIndex].fileType;
    this.isImage = fileType.startsWith('image/');
    this.isPDF = fileType === 'application/pdf';
  }

  prevDocument(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.updateDocumentType();
    }
  }

  nextDocument(): void {
    if (this.selectedIndex < this.documents.length - 1) {
      this.selectedIndex++;
      this.updateDocumentType();
    }
  }
}
